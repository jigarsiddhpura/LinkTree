package dev.jigar.linktree.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LinkAnalyticsId implements Serializable {
    @Column(name = "link_id")
    private UUID linkId;
    
    @Column(name = "profile_id")
    private UUID profileId;
    
    @Column(name = "recorded_date")
    private LocalDate recordedDate;
}
