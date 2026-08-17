package tradescout.api.tradescout.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import tradescout.api.tradescout.models.Business;
import tradescout.api.tradescout.enums.BusinessRoleEnum;



@Entity
@Table(name="BusinessRole")
@Getter 
@Setter
@NoArgsConstructor


public class BusinessRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_id", nullable = false)
    private Business business;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_name", nullable = false)
    private BusinessRoleEnum role;
}