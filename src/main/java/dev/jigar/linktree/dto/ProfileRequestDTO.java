package dev.jigar.linktree.dto;

import dev.jigar.linktree.entity.Profile;
import lombok.Data;

import java.util.UUID;

@Data
public class ProfileRequestDTO {
    private String username;
    private String bio;
    private String themeSettings;
    private String seoSettings;
    private Boolean isPublished;
}
