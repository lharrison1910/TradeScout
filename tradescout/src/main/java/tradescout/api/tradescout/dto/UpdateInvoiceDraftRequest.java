package tradescout.api.tradescout.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UpdateInvoiceDraftRequest extends CreateInvoiceDraftRequest {
    @NotNull(message = "Must include the Invoice Id")
    private Long invoiceId;
}
