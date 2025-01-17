package dev.jigar.linktree.dto;

import dev.jigar.linktree.entity.Link;
import lombok.Data;
import java.util.UUID;

@Data
public class LinkResponseDTO {
    private UUID id;
    private UUID profileId;
    private String title;
    private String url;
    private Integer position;
    private Boolean isVisible;
    private String thumbnail;

    public LinkResponseDTO(Link link) {
        this.id = link.getId();
        this.profileId = link.getProfile().getId();
        this.title = link.getTitle();
        this.url = link.getUrl();
        this.position = link.getPosition();
        this.isVisible = link.getIsVisible();
        this.thumbnail = link.getThumbnail();
    }
}
