package dev.jigar.linktree.repository;

import dev.jigar.linktree.entity.LinkAnalytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface LinkAnalyticsRepository extends JpaRepository<LinkAnalytics, UUID> {
    @Query("""
        SELECT la FROM LinkAnalytics la 
        WHERE la.linkId IN (SELECT l.id FROM Link l WHERE l.profile.id = :profileId)
        AND la.createdAt BETWEEN :startDate AND :endDate
        ORDER BY la.createdAt""")
    List<LinkAnalytics> findByProfileIdAndDateRange(UUID profileId, LocalDate startDate, LocalDate endDate);
}
