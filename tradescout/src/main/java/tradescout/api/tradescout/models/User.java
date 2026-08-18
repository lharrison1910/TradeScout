package tradescout.api.tradescout.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.util.ArrayList;
import java.util.List;

import tradescout.api.tradescout.models.Business;
import tradescout.api.tradescout.models.BusinessRole;
import tradescout.api.tradescout.enums.AuthProviderEnum;

@Entity
@Table(name="User")
@Getter 
@Setter
@NoArgsConstructor

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String email;

    @Column
    private String name;

    @Column(nullable=true)
    private String password;


    @Enumerated(EnumType.STRING)
    @Column(name="auth_provider",  nullable=true)
    private  AuthProviderEnum authProvider;

    @Column(name="provider_Id", nullable=true, unique=true)
    private String providerId;

    @Column
    private boolean termsAccepted = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;


    @OneToMany(mappedBy="user", cascade=CascadeType.ALL, orphanRemoval=true)
    private List<Business> Business = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BusinessRole> BusinessRoles = new ArrayList<>();

}