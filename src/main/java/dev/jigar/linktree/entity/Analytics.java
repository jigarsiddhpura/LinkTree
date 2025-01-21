package dev.jigar.linktree.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "analytics")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Analytics {
    
    @EmbeddedId
    private AnalyticsId id;
    
    @Column(name = "views_count")
    private Integer viewsCount = 0;
    
    @Column(name = "unique_visitors")
    private Integer uniqueVisitors = 0;
    
    @Column(name = "last_updated_at")
    private LocalDateTime lastUpdatedAt;
    
    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        lastUpdatedAt = LocalDateTime.now();
    }
    
    // Custom getter for profile ID
    public UUID getProfileId() {
        return id != null ? id.getProfileId() : null;
    }
    
    // Custom getter for recorded date
    public LocalDate getRecordedDate() {
        return id != null ? id.getRecordedDate() : null;
    }
}
