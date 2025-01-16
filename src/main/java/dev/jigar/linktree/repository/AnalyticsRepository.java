package dev.jigar.linktree.repository;

import dev.jigar.linktree.entity.Analytics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AnalyticsRepository extends JpaRepository<Analytics, UUID> {
}
