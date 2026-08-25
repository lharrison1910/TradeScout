package tradescout.api.tradescout.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import tradescout.api.tradescout.models.Business;

public interface BusinessRepository extends JpaRepository<Business, Long> {
    Optional<Business> findByIdAndUserId(Long id, Long userId);
}