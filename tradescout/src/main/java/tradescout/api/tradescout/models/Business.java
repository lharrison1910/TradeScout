package tradescout.api.tradescout.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import tradescout.api.tradescout.models.User;


@Entity
@Table(name="Business")
@Getter 
@Setter
@NoArgsConstructor


public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column(nullable=true)
    private String taxReference;

    @Column(nullable=true)
    private String bankName;

    @Column(nullable=true)
    private String accountName;

    @Column(nullable=true)
    private String accountNumber;

    @Column(nullable=true)
    private String sortCode;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", nullable=false)
    private User user;
}