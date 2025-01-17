package dev.jigar.linktree.entity;

import lombok.*;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "links")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Link {

    @Id
    @GeneratedValue(generator = "uuid2")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, length = 512)
    private String url;
    
    /**
     * This field helps us store and maintain the ordering (position) of links
     * so they can appear in the correct order on the frontend.
     */
    @Column(nullable = false)
    private Integer position;

    private Boolean isVisible = true;

    @Column(nullable = false, length = 512)
    private String thumbnail;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}
