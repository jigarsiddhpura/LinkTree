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
@Table(name = "profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {

    @Id
    @GeneratedValue(generator = "uuid2")
    private UUID id;

    // LAZY fetching means that here, initial query loads only Profile data
    // then if there's an access for user (profile.getUser()), then a separate query is triggered for it
    // OPTIMIZE MEMORY USAGE

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, unique = true, length = 100)
    private String username;

    @Column(length = 255)
    private String title;

    @Column(length = 255)
    private String bio;

    @Column(length = 255)
    private String profileImage;

    @Column(length = 255)
    private String templateColor ;

    private Boolean isPublished = false;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}
