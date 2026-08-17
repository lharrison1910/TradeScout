package tradescout.api.tradescout.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import tradescout.api.tradescout.enums.InvoiceStatusEnum;
import tradescout.api.tradescout.models.InvoiceData;
import tradescout.api.tradescout.models.Business;


@Entity
@Table(name="Invoice")
@Getter 
@Setter
@NoArgsConstructor

public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String invoiceNumber;

    @Column(nullable=false)
    private String customerName;

    @Column(nullable = false, precision = 19, scale = 4)
    private BigDecimal totalAmount;

    @Column(nullable = false, precision = 19, scale = 4)
    private BigDecimal totalVatAmount;

    @Enumerated(EnumType.STRING)
    @Column
    private InvoiceStatusEnum status = InvoiceStatusEnum.DRAFT;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private InvoiceData invoiceSnapshot;

    @Column
    private Instant issuedAt;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_id", nullable = false)
    private Business business;
}