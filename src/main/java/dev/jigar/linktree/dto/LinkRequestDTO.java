package dev.jigar.linktree.dto;

import lombok.Data;

@Data
public class LinkRequestDTO {
    private String title;
    private String url;
    private String icon;
    private Integer position;
    private Boolean isVisible;
    private String customStyles;
}
