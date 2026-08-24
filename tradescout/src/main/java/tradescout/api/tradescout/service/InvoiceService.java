package tradescout.api.tradescout.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        // 1. Ownership Security Check
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

}
