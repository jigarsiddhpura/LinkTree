package dev.jigar.linktree.dto;

import dev.jigar.linktree.entity.Profile;
import lombok.Data;

import java.util.UUID;

@Data
public class ProfileRequestDTO {
    private String username;
    private String title;
    private String bio;
    private String profileImage;
    private String templateColor;
    // private Boolean isPublished;
}
