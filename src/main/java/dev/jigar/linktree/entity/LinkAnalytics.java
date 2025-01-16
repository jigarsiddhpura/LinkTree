package dev.jigar.linktree.entity;

import lombok.*;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "link_id", nullable = false)
    private Link link;

    private Integer clicksCount = 0;
    
    private LocalDateTime createdAt = LocalDateTime.now();
}
