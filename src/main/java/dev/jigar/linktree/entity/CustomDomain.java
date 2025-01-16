package dev.jigar.linktree.entity;

import lombok.*;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "custom_domains")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomDomain {

    public enum SslStatus {
        pending, active, failed
    }

    @Id
    @GeneratedValue(generator = "uuid2")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

    @Column(nullable = false, unique = true)
    private String domainName;

    @Enumerated(EnumType.STRING)
    private SslStatus sslStatus = SslStatus.pending;

    private Boolean isVerified = false;

    @Column(columnDefinition = "jsonb")
    private String dnsRecords = "{}";

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}
