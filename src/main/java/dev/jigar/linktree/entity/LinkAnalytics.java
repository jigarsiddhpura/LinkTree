package dev.jigar.linktree.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "link_analytics")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LinkAnalytics {

    @EmbeddedId
    private LinkAnalyticsId id;
    
    @Column(name = "clicks_count")
    private Integer clicksCount = 0;
    
    @Column(name = "unique_click")
    private Integer uniqueClick = 0;
    
    @Column(name = "last_updated_at")
    private LocalDateTime lastUpdatedAt;
    
    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        lastUpdatedAt = LocalDateTime.now();
    }
    
    // Custom getters for composite key components
    public UUID getLinkId() {
        return id != null ? id.getLinkId() : null;
    }
    
    public UUID getProfileId() {
        return id != null ? id.getProfileId() : null;
    }
    
    public LocalDate getRecordedDate() {
        return id != null ? id.getRecordedDate() : null;
    }
}

