package tradescout.api.tradescout.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tradescout.api.tradescout.models.RefreshToken;
import tradescout.api.tradescout.models.User;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    
    Optional<RefreshToken> findByToken(String token);
    
    int deleteByUser(User user);
}