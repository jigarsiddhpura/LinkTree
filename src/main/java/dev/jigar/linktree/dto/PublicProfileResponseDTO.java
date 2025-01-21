package dev.jigar.linktree.dto;

import dev.jigar.linktree.entity.Link;
import dev.jigar.linktree.entity.Profile;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class PublicProfileResponseDTO {
    private UUID id;
    private String username;
    private String title;
    private String bio;
    private String templateColor;
    private String profileImage;
    private List<LinkResponseDTO> links;

    public PublicProfileResponseDTO(Profile profile, List<LinkResponseDTO> links) {
        this.id = profile.getId();
        this.username = profile.getUsername();
        this.title = profile.getTitle();
        this.bio = profile.getBio();
        this.templateColor = profile.getTemplateColor();
        this.profileImage = profile.getProfileImage();
        this.links = links;
    }
}

