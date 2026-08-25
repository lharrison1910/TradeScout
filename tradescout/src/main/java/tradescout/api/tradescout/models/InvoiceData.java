package tradescout.api.tradescout.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceData {

    // --- 1. Business Snapshot (Locked at issuance) ---
    @JsonProperty("business_name")
    private String businessName;

    @JsonProperty("business_address")
    private String businessAddress;

    @JsonProperty("business_phone")
    private String businessPhone;

    @JsonProperty("business_email")
    private String businessEmail;

    @JsonProperty("business_vat_number")
    private String businessVatNumber;

    // --- 2. Invoice Meta ---
    @JsonProperty("invoice_number")
    private String invoiceNumber;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonProperty("invoice_date")
    private LocalDate invoiceDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonProperty("due_date")
    private LocalDate dueDate;

    @JsonProperty("payment_terms_days")
    private Integer paymentTermsDays;

    // --- 3. Customer Details ---
    @JsonProperty("customer_name")
    private String customerName;

    @JsonProperty("customer_address")
    private String customerAddress;

    @JsonProperty("customer_phone")
    private String customerPhone;

    @JsonProperty("customer_email")
    private String customerEmail;

    @JsonProperty("customer_vat_number")
    private String customerVatNumber;

    // --- 4. Job / Site Info ---
    @JsonProperty("job_location")
    private String jobLocation;

    @JsonProperty("job_reference")
    private String jobReference;

    @JsonProperty("po_number")
    private String poNumber;

    // --- 5. Line Items Breakdown ---
    @Builder.Default
    @JsonProperty("line_items")
    private List<LineItem> lineItems = new ArrayList<>();

    // --- 6. Financial Calculations ---
    private BigDecimal subtotal;

    @JsonProperty("vat_rate")
    private BigDecimal vatRate;

    @JsonProperty("total_vat")
    private BigDecimal totalVat;

    @JsonProperty("discount_amount")
    private BigDecimal discountAmount;

    // UK Construction Industry Scheme (CIS)
    @JsonProperty("cis_deduction_rate")
    private BigDecimal cisDeductionRate;

    @JsonProperty("cis_deduction_amount")
    private BigDecimal cisDeductionAmount;

    @JsonProperty("amount_due")
    private BigDecimal amountDue;

    // --- 7. Payment Information ---
    @JsonProperty("bank_name")
    private String bankName;

    @JsonProperty("account_name")
    private String accountName;

    @JsonProperty("sort_code")
    private String sortCode;

    @JsonProperty("account_number")
    private String accountNumber;

    @JsonProperty("payment_notes")
    private String paymentNotes;

    // --- Nested Classes & Enums ---

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LineItem {

        private LineItemType type;

        private String description;

        private BigDecimal quantity;

        private String unit;

        @JsonProperty("unit_price")
        private BigDecimal unitPrice;

        @JsonProperty("vat_rate")
        private BigDecimal vatRate;

        @JsonProperty("line_total")
        private BigDecimal lineTotal;
    }

    public enum LineItemType {
        LABOR,
        MATERIAL,
        EXPENSE
    }
}