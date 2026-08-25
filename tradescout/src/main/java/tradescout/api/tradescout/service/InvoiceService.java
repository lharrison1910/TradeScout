package tradescout.api.tradescout.service;

import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import com.deepoove.poi.XWPFTemplate;

import tradescout.api.tradescout.dto.CreateInvoiceDraftRequest;
import tradescout.api.tradescout.dto.UpdateInvoiceDraftRequest;
import tradescout.api.tradescout.enums.InvoiceStatusEnum;
import tradescout.api.tradescout.exception.ResourceNotFoundException;
import tradescout.api.tradescout.exception.UnauthorizedAccessException;
import tradescout.api.tradescout.models.Business;
import tradescout.api.tradescout.models.Invoice;
import tradescout.api.tradescout.models.InvoiceData;
import tradescout.api.tradescout.repository.BusinessRepository;
import tradescout.api.tradescout.repository.InvoiceRepository;

@Service
public class InvoiceService {

    private static final Logger logger = LoggerFactory.getLogger(InvoiceService.class);

    private final InvoiceRepository invoiceRepository;
    private final BusinessRepository businessRepository;

    public InvoiceService(InvoiceRepository invoiceRepository, BusinessRepository businessRepository) {
        this.invoiceRepository = invoiceRepository;
        this.businessRepository = businessRepository;
    }

    @Transactional
    public Invoice createDraft(CreateInvoiceDraftRequest payload, Long currentUserId) {
        Business business = businessRepository.findByIdAndUserId(payload.getBusinessId(), currentUserId)
                .orElseThrow(() -> new UnauthorizedAccessException(
                "Business not found or you do not have permission to access it"));

        // 1. Build the Snapshot Data for JSON storage
        InvoiceData snapshotData = InvoiceData.builder()
                .businessName(business.getBusinessName())
                .businessVatNumber(business.getVatNumber())
                .customerName(payload.getCustomerName())
                .invoiceNumber(payload.getInvoiceNumber())
                .amountDue(payload.getAmountDue())
                .totalVat(payload.getVatAmount())
                .bankName(business.getBankName())
                .accountName(business.getAccountName())
                .accountNumber(business.getAccountNumber())
                .sortCode(business.getSortCode())
                .build();

        // 2. Create and populate Invoice entity
        Invoice invoice = new Invoice();
        invoice.setBusiness(business);
        invoice.setInvoiceNumber(payload.getInvoiceNumber());
        invoice.setCustomerName(payload.getCustomerName());
        invoice.setTotalAmount(payload.getAmountDue());
        invoice.setTotalVatAmount(payload.getVatAmount());
        invoice.setStatus(InvoiceStatusEnum.DRAFT);
        invoice.setInvoiceSnapshot(snapshotData);

        logger.info("Draft invoice {} created for business ID {}", invoice.getInvoiceNumber(), business.getId());
        return invoiceRepository.save(invoice);
    }

    @Transactional
    public Invoice updateInvoice(Long invoiceId, UpdateInvoiceDraftRequest payload, Long currentUserId) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with ID: " + invoiceId));

        if (!invoice.getBusiness().getUser().getId().equals(currentUserId)) {
            throw new UnauthorizedAccessException("You do not have permission to modify this invoice");
        }

        if (invoice.getStatus() != InvoiceStatusEnum.DRAFT) {
            throw new IllegalStateException(
                    "Only DRAFT invoices can be updated. Issued or paid invoices are locked for accounting compliance.");
        }

        invoice.setCustomerName(payload.getCustomerName());
        invoice.setInvoiceNumber(payload.getInvoiceNumber());

        if (payload.getAmountDue() != null) {
            invoice.setTotalAmount(payload.getAmountDue());
        }
        if (payload.getVatAmount() != null) {
            invoice.setTotalVatAmount(payload.getVatAmount());
        }

        InvoiceData snapshot = invoice.getInvoiceSnapshot();
        if (snapshot != null) {
            snapshot.setCustomerName(payload.getCustomerName());
            snapshot.setInvoiceNumber(payload.getInvoiceNumber());
            snapshot.setCustomerAddress(payload.getCustomerAddress());
            snapshot.setCustomerPhone(payload.getCustomerPhone());
            snapshot.setCustomerEmail(payload.getCustomerEmail());
            snapshot.setJobLocation(payload.getJobLocation());
            snapshot.setJobReference(payload.getJobReference());
            snapshot.setAmountDue(payload.getAmountDue());
            snapshot.setTotalVat(payload.getVatAmount());
            invoice.setInvoiceSnapshot(snapshot);
        }

        logger.info("Invoice ID {} updated by user ID {}", invoiceId, currentUserId);
        return invoiceRepository.save(invoice);
    }

    @Transactional
    public void deleteInvoice(Long invoiceId, Long currentUserId) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with ID: " + invoiceId));

        if (!invoice.getBusiness().getUser().getId().equals(currentUserId)) {
            throw new UnauthorizedAccessException("You do not have permission to delete this invoice");
        }

        if (invoice.getStatus() == InvoiceStatusEnum.DRAFT) {
            invoiceRepository.delete(invoice);
            logger.info("Hard deleted draft invoice ID {} by user ID {}", invoiceId, currentUserId);
        } else {
            invoice.setDeleted(true);
            invoiceRepository.save(invoice);
            logger.info("Soft deleted invoice ID {} by user ID {}", invoiceId, currentUserId);
        }
    }

    @Transactional(readOnly = true)
    public Invoice getInvoiceById(Long id, Long currentUserId) {
        return invoiceRepository.findByIdAndBusinessUserIdAndIsDeletedFalse(id, currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found or access denied for ID: " + id));
    }

    @Transactional(readOnly = true)
    public Page<Invoice> getInvoicesForBusiness(
            Long businessId,
            InvoiceStatusEnum status,
            Pageable pageable,
            Long currentUserId
    ) {
        businessRepository.findByIdAndUserId(businessId, currentUserId)
                .orElseThrow(() -> new UnauthorizedAccessException("Business not found or access denied"));

        if (status != null) {
            return invoiceRepository.findByBusinessIdAndBusinessUserIdAndStatusAndIsDeletedFalse(
                    businessId, currentUserId, status, pageable);
        }

        return invoiceRepository.findByBusinessIdAndBusinessUserIdAndIsDeletedFalse(
                businessId, currentUserId, pageable);
    }

    @Transactional(readOnly = true)
    public byte[] downloadInvoice(Long invoiceId, Long currentUserId) {
        Invoice invoice = invoiceRepository.findByIdAndBusinessUserIdAndIsDeletedFalse(invoiceId, currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found or access denied for ID: " + invoiceId));

        InvoiceData invoiceData = invoice.getInvoiceSnapshot();
        if (invoiceData == null) {
            throw new IllegalStateException("Invoice snapshot data is missing for invoice ID: " + invoiceId);
        }

        return getInvoiceBuffer(invoiceData);
    }

    @Transactional
    public byte[] issueInvoice(Long invoiceId, Long currentUserId) {
        // 1. Fetch invoice and verify tenant ownership
        Invoice invoice = invoiceRepository.findByIdAndBusinessUserIdAndIsDeletedFalse(invoiceId, currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("No invoice found with ID: " + invoiceId));

        // 2. Status guard clause (Only DRAFT can be issued)
        if (invoice.getStatus() != InvoiceStatusEnum.DRAFT) {
            throw new IllegalStateException("Invoice is not a draft and cannot be issued");
        }

        byte[] buffer;
        try {
            buffer = getInvoiceBuffer(invoice.getInvoiceSnapshot());

            // Save to AWS S3
        } catch (ResourceNotFoundException e) {
            logger.error("_getInvoiceBuffer: Template not found - {}", e.getMessage(), e);
            throw e;
        } catch (Exception e) {
            logger.error("issueInvoice: Failed to generate docx file - {}", e.getMessage(), e);
            throw new RuntimeException("Failed to generate invoice preview", e);
        }

        invoice.setStatus(InvoiceStatusEnum.UNPAID);
        invoiceRepository.save(invoice);

        logger.info("Successfully issued invoice {} (ID: {})", invoice.getInvoiceNumber(), invoiceId);
        return buffer;
    }

    public byte[] getInvoiceBuffer(InvoiceData invoiceData) {
        ClassPathResource resource = new ClassPathResource("templates/template.docx");

        if (!resource.exists()) {
            throw new ResourceNotFoundException("Invoice template not found at templates/template.docx");
        }

        try (InputStream inputStream = resource.getInputStream(); ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            XWPFTemplate template = XWPFTemplate.compile(inputStream).render(invoiceData);

            template.write(outputStream);
            template.close();

            return outputStream.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Failed to generate docx invoice buffer", e);
        }
    }

}
