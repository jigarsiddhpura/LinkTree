package dev.jigar.linktree.entity;

import lombok.*;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.UUID;


@Entity
@Table(name = "analytics")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Analytics {

    @Id
    @GeneratedValue(generator = "uuid2")
    private UUID id;
    
    @Column(name = "profile_id", nullable = false)
    private UUID profileId;
    
    @Column(name = "recorded_date", nullable = false)
    private LocalDate recordedDate;
    
    @Column(name = "views_count")
    private Integer viewsCount = 0;
    
    @Column(name = "unique_visitors")
    private Integer uniqueVisitors = 0;

}
