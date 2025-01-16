package dev.jigar.linktree.controller;

import dev.jigar.linktree.dto.LinkRequestDTO;
import dev.jigar.linktree.dto.LinkResponseDTO;
import dev.jigar.linktree.entity.Link;
import dev.jigar.linktree.entity.Profile;
import dev.jigar.linktree.service.LinkService;
import dev.jigar.linktree.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/links")
@CrossOrigin(origins = "*")
public class LinkController {

    @Autowired
    private LinkService linkService;

    @Autowired
    private ProfileService profileService;

    @PostMapping("/{profileId}")
    public ResponseEntity<LinkResponseDTO> createLink(
            @PathVariable UUID profileId, 
            @RequestBody LinkRequestDTO requestDTO) {
        
        Profile profile = profileService.getProfileById(profileId);
        Link newLink = Link.builder()
                .title(requestDTO.getTitle())
                .url(requestDTO.getUrl())
                .icon(requestDTO.getIcon())
                .position(requestDTO.getPosition())
                .isVisible(requestDTO.getIsVisible())
                .customStyles(requestDTO.getCustomStyles())
                .build();

        Link saved = linkService.createLink(profile, newLink);
        return ResponseEntity.ok(new LinkResponseDTO(saved));
    }

    @PutMapping("/{linkId}")
    public ResponseEntity<LinkResponseDTO> updateLink(
            @PathVariable UUID linkId, 
            @RequestBody LinkRequestDTO requestDTO) {
        
        Link updated = linkService.updateLink(linkId,
                Link.builder()
                        .title(requestDTO.getTitle())
                        .url(requestDTO.getUrl())
                        .icon(requestDTO.getIcon())
                        .position(requestDTO.getPosition())
                        .isVisible(requestDTO.getIsVisible())
                        .customStyles(requestDTO.getCustomStyles())
                        .build());

        return ResponseEntity.ok(new LinkResponseDTO(updated));
    }

    @DeleteMapping("/{linkId}")
    public ResponseEntity<Void> deleteLink(@PathVariable UUID linkId) {
        linkService.deleteLink(linkId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/profile/{profileId}")
    public ResponseEntity<List<LinkResponseDTO>> getLinksByProfile(@PathVariable UUID profileId) {
        Profile profile = profileService.getProfileById(profileId);
        List<Link> links = linkService.getLinksByProfile(profile);
        List<LinkResponseDTO> responseDTOs = links.stream()
                .map(LinkResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }
}
