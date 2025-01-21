package dev.jigar.linktree.dto;

import dev.jigar.linktree.entity.Profile;
import lombok.Data;

import java.util.UUID;

@Data
public class ProfileResponseDTO {
    private UUID id;
    private String username;
    private String title;
    private String bio;
    private String templateColor;
    private String profileImage;

    public ProfileResponseDTO(Profile profile) {
        this.id = profile.getId();
        this.username = profile.getUsername();
        this.title = profile.getTitle();
        this.bio = profile.getBio();
        this.templateColor = profile.getTemplateColor();
        this.profileImage = profile.getProfileImage();
    }
}
