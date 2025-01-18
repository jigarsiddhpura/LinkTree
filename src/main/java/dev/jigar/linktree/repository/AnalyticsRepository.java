package dev.jigar.linktree.repository;

import dev.jigar.linktree.entity.Analytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface AnalyticsRepository extends JpaRepository<Analytics, UUID> {
    @Query("""
        SELECT a FROM Analytics a 
        WHERE a.profileId = :profileId 
        AND a.recordedDate BETWEEN :startDate AND :endDate
        ORDER BY a.recordedDate""")
    List<Analytics> findByProfileIdAndDateRange(UUID profileId, LocalDate startDate, LocalDate endDate);

}
