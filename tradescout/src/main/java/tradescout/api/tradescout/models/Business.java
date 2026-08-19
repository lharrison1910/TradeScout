package tradescout.api.tradescout.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "businesses")
@Getter 
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "business_name", nullable = false)
    private String businessName; 

    @Column(name = "vat_number", nullable = true)
    private String vatNumber;

    @Column(name = "tax_reference", nullable = true)
    private String taxReference;

    @Column(name = "bank_name", nullable = true)
    private String bankName;

    @Column(name = "account_name", nullable = true)
    private String accountName;

    @Column(name = "account_number", nullable = true)
    private String accountNumber;

    @Column(name = "sort_code", nullable = true)
    private String sortCode;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}