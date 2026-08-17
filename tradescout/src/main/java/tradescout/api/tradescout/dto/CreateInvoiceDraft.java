package tradescout.api.tradescout.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateInvoiceDraftRequest {

    @NotNull(message = "Business ID is required")
    private Long businessId;

    @NotBlank(message = "Invoice number is required")
    private String invoiceNumber;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotNull(message = "Amount due is required")
    @DecimalMin(value = "0.00", message = "Amount due cannot be negative")
    private BigDecimal amountDue;

    private BigDecimal vatAmount = BigDecimal.ZERO;
}