package tradescout.api.tradescout.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tradescout.api.tradescout.models.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Used by AuthService during login to fetch the user by their email.
     * Returns an Optional to cleanly handle cases where the email doesn't exist.
     */
    Optional<User> findByEmail(String email);

    /**
     * Used during registration to prevent duplicate accounts with the same email.
     */
    boolean existsByEmail(String email);
}