package tradescout.api.tradescout.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tradescout.api.tradescout.dto.CreateInvoiceDraftRequest;
import tradescout.api.tradescout.enums.InvoiceStatusEnum;
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
        // Updated to findByIdAndUserId
        Business business = businessRepository.findByIdAndUserId(payload.getBusinessId(), currentUserId)
                .orElseThrow(() -> new UnauthorizedAccessException(
                        "Business not found or you do not have permission to access it"
                ));

        InvoiceData snapshotData = new InvoiceData();
        snapshotData.setCustomerName(payload.getCustomerName());
        snapshotData.setInvoiceNumber(payload.getInvoiceNumber());
        snapshotData.setAmountDue(payload.getAmountDue());

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
}