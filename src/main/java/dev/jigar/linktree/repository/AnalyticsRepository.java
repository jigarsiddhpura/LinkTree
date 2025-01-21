package dev.jigar.linktree.repository;

import dev.jigar.linktree.entity.Analytics;
import dev.jigar.linktree.entity.AnalyticsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface AnalyticsRepository extends JpaRepository<Analytics, AnalyticsId> {
    @Query("""
        SELECT a FROM Analytics a 
        WHERE a.id.profileId = :profileId 
        AND a.id.recordedDate BETWEEN :startDate AND :endDate
        ORDER BY a.id.recordedDate""")
    List<Analytics> findByProfileIdAndDateRange(UUID profileId, LocalDate startDate, LocalDate endDate);

}
