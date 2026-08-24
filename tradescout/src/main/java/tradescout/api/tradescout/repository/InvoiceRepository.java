package tradescout.api.tradescout.repository;

import tradescout.api.tradescout.enums.InvoiceStatusEnum;
import tradescout.api.tradescout.models.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    Optional<Invoice> findByIdAndBusinessId(Long id, Long businessId);

    Optional<Invoice> findByIdAndBusinessUserIdAndIsDeletedFalse(Long id, Long userId);

    Page<Invoice> findByBusinessIdAndBusinessUserIdAndIsDeletedFalse(
            Long businessId, Long userId, Pageable pageable);

    Page<Invoice> findByBusinessIdAndBusinessUserIdAndStatusAndIsDeletedFalse(
            Long businessId, Long userId, InvoiceStatusEnum status, Pageable pageable);
}