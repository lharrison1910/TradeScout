package tradescout.api.tradescout.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;
import tradescout.api.tradescout.enums.InvoiceStatusEnum;

import java.math.BigDecimal; 
import java.time.Instant;

@Entity
@Table(name = "invoices")
@Getter 
@Setter
@NoArgsConstructor
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String invoiceNumber;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false, precision = 19, scale = 4)
    private BigDecimal totalAmount;

    @Column(nullable = false, precision = 19, scale = 4)
    private BigDecimal totalVatAmount;

    @Enumerated(EnumType.STRING)
    @Column
    private InvoiceStatusEnum status = InvoiceStatusEnum.DRAFT;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "invoice_snapshot", columnDefinition = "jsonb")
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