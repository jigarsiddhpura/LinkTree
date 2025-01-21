package dev.jigar.linktree.repository;

import dev.jigar.linktree.entity.LinkAnalytics;
import dev.jigar.linktree.entity.LinkAnalyticsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface LinkAnalyticsRepository extends JpaRepository<LinkAnalytics, LinkAnalyticsId> {
    @Query("""
        SELECT la FROM LinkAnalytics la 
        WHERE la.id.linkId IN (SELECT l.id FROM Link l WHERE l.profile.id = :profileId)
        AND la.id.recordedDate BETWEEN :startDate AND :endDate
        ORDER BY la.id.recordedDate""")
    List<LinkAnalytics> findByProfileIdAndDateRange(UUID profileId, LocalDate startDate, LocalDate endDate);
}
