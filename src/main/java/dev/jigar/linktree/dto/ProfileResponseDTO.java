package dev.jigar.linktree.dto;

import dev.jigar.linktree.entity.Profile;
import lombok.Data;

import java.util.UUID;

@Data
public class ProfileResponseDTO {
    private UUID id;
    private String username;
    private String bio;
    private String themeSettings;
    private String seoSettings;
    private Boolean isPublished;

    public ProfileResponseDTO(Profile profile) {
        this.id = profile.getId();
        this.username = profile.getUsername();
        this.bio = profile.getBio();
        this.themeSettings = profile.getThemeSettings();
        this.seoSettings = profile.getSeoSettings();
        this.isPublished = profile.getIsPublished();
    }
}
