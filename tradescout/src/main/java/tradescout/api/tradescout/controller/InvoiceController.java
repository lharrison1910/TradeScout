package tradescout.api.tradescout.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import tradescout.api.tradescout.dto.CreateInvoiceDraftRequest;
import tradescout.api.tradescout.models.Invoice;
import tradescout.api.tradescout.service.InvoiceService;

import tradescout.api.tradescout.security.UserPrincipal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PostMapping("/draft")
    public ResponseEntity<Invoice> draftInvoice(
            @Valid @RequestBody CreateInvoiceDraftRequest payload,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        Invoice invoice = invoiceService.createDraft(payload, currentUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(invoice);
    }

}
