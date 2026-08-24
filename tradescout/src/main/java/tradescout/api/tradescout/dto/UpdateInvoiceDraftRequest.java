package tradescout.api.tradescout.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateInvoiceDraftRequest {

    @NotBlank(message = "Invoice number is required")
    private String invoiceNumber;

    @NotNull(message = "Issue date is required")
    private LocalDate issueDate;

    private LocalDate dueDate;

    @Min(value = 0, message = "Payment terms days cannot be negative")
    private Integer paymentTermsDays;

    // Customer Information
    @NotBlank(message = "Customer name is required")
    private String customerName;

    private String customerAddress;
    private String customerPhone;

    @Email(message = "Invalid customer email format")
    private String customerEmail;

    private String customerVatNumber;

    @NotNull(message = "Amount due is required")
    @DecimalMin(value = "0.00", message = "Amount due cannot be negative")
    private BigDecimal amountDue;

    private BigDecimal vatAmount = BigDecimal.ZERO;

    private String jobLocation;
    private String jobReference;
    private String poNumber;

    @NotEmpty(message = "Invoice must contain at least one line item")
    @Valid
    private List<LineItemRequest> lineItems = new ArrayList<>();

    @DecimalMin(value = "0.00", message = "VAT rate cannot be negative")
    private BigDecimal vatRate;

    @DecimalMin(value = "0.00", message = "Discount cannot be negative")
    private BigDecimal discountAmount;

    private String notes;
}