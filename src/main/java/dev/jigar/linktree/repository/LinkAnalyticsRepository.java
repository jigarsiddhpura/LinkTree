package dev.jigar.linktree.repository;

import dev.jigar.linktree.entity.LinkAnalytics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LinkAnalyticsRepository extends JpaRepository<LinkAnalytics, UUID> {
}
