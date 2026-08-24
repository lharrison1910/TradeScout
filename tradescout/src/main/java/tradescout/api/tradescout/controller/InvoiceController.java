package tradescout.api.tradescout.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import tradescout.api.tradescout.dto.CreateInvoiceDraftRequest;
import tradescout.api.tradescout.dto.UpdateInvoiceDraftRequest;
import tradescout.api.tradescout.enums.InvoiceStatusEnum;
import tradescout.api.tradescout.models.Invoice;
import tradescout.api.tradescout.service.InvoiceService;

import tradescout.api.tradescout.security.UserPrincipal;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PutMapping("/{id}")
    public ResponseEntity<Invoice> updateInvoice(
            @PathVariable Long id,
            @Valid @RequestBody UpdateInvoiceDraftRequest payload,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        Invoice updatedInvoice = invoiceService.updateInvoice(id, payload, currentUser.getId());
        return ResponseEntity.ok(updatedInvoice);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvoice(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        invoiceService.deleteInvoice(id, currentUser.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getInvoiceById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal currentUser
    ) {
        Invoice invoice = invoiceService.getInvoiceById(id, currentUser.getId());
        return ResponseEntity.ok(invoice);
    }


    @GetMapping
    public ResponseEntity<Page<Invoice>> getInvoices(
            @RequestParam Long businessId,
            @RequestParam(required = false) InvoiceStatusEnum status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @AuthenticationPrincipal UserPrincipal currentUser
    ) {
        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Invoice> invoices = invoiceService.getInvoicesForBusiness(
                businessId, status, pageable, currentUser.getId());

        return ResponseEntity.ok(invoices);
    }

}
