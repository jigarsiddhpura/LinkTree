package dev.jigar.linktree.dto;

import dev.jigar.linktree.entity.Link;
import lombok.Data;

import java.util.UUID;

@Data
public class LinkResponseDTO {
    private UUID id;
    private String title;
    private String url;
    private String icon;
    private Integer position;
    private Boolean isVisible;
    private String customStyles;

    public LinkResponseDTO(Link link) {
        this.id = link.getId();
        this.title = link.getTitle();
        this.url = link.getUrl();
        this.icon = link.getIcon();
        this.position = link.getPosition();
        this.isVisible = link.getIsVisible();
        this.customStyles = link.getCustomStyles();
    }
}
