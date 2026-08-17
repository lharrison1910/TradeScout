package tradescout.api.tradescout.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import tradescout.api.tradescout.models.Business;

@Repository
public interface BusinessRepository extends JpaRepository<Business, Long> {
    Optional<Business> findByIdAndOwnerId(Long id, Long ownerId);
    Optional<Business> findByIdAndUserId(Long id, Long userId);
}