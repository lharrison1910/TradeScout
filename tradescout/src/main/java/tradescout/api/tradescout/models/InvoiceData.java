package tradescout.api.tradescout.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class InvoiceData {

    @JsonProperty("invoice_number")
    private String invoiceNumber;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonProperty("invoice_date")
    private LocalDate invoiceDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonProperty("due_date")
    private LocalDate dueDate;

    @JsonProperty("customer_name")
    private String customerName;

    @JsonProperty("customer_address")
    private String customerAddress;

    @JsonProperty("customer_phone")
    private String customerPhone;

    @JsonProperty("customer_email")
    private String customerEmail;

    @JsonProperty("job_location")
    private String jobLocation;

    @JsonProperty("job_reference")
    private String jobReference;

    @JsonProperty("line_items")
    private List<LineItem> lineItems;

    private BigDecimal subtotal;
    
    @JsonProperty("total_vat")
    private BigDecimal totalVat;
    
    @JsonProperty("discount_amount")
    private BigDecimal discountAmount;

    @JsonProperty("cis_deduction_rate")
    private BigDecimal cisDeductionRate;
    
    @JsonProperty("cis_deduction_amount")
    private BigDecimal cisDeductionAmount;

    @JsonProperty("amount_due")
    private BigDecimal amountDue;

    @JsonProperty("bank_name")
    private String bankName;
    
    @JsonProperty("account_name")
    private String accountName;
    
    @JsonProperty("sort_code")
    private String sortCode;
    
    @JsonProperty("account_number")
    private String accountNumber;
    
    @JsonProperty("payment_terms_days")
    private Integer paymentTermsDays;
    
    @JsonProperty("payment_notes")
    private String paymentNotes;

    // --- Nested Classes & Enums ---

    @Data
    @NoArgsConstructor
    public static class LineItem {

        private LineItemType type;
        
        private String description;
        
        // BigDecimal is used for quantity because tradespeople might bill for "1.5" days
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