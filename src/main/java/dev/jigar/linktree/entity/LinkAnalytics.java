package dev.jigar.linktree.entity;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "link_analytics")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LinkAnalytics {

    @Id
    @GeneratedValue(generator = "uuid2")
    private UUID id;

    @Column(name = "link_id", nullable = false)
    private UUID linkId;

    @Column(name = "profile_id", nullable = false)
    private UUID profileId;
    
    @Column(name = "clicks_count")
    private Integer clicksCount = 0;
    
    @Column(name = "unique_click")
    private Integer uniqueClick = 0;
    
    @Column(name = "created_at")
    private LocalDate createdAt;
}
