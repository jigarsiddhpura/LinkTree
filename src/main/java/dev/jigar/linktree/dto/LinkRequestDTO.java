package dev.jigar.linktree.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class LinkRequestDTO {
    private UUID profileId;      
    private String title;
    private String url;
    private Integer position;
    private Boolean isVisible;
    private String thumbnail;
}
