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
public class LinkController {

    @Autowired
    private LinkService linkService;

    @Autowired
    private ProfileService profileService;

    @PostMapping
    public ResponseEntity<LinkResponseDTO> createLink(@RequestBody LinkRequestDTO dto) {
        LinkResponseDTO response = linkService.createLink(dto);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{linkId}")
    public ResponseEntity<LinkResponseDTO> updateLink(@PathVariable UUID linkId, @RequestBody LinkRequestDTO dto) {
        LinkResponseDTO response = linkService.updateLink(linkId, dto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{linkId}")
    public ResponseEntity<Void> deleteLink(@PathVariable UUID linkId) {
        linkService.deleteLink(linkId);
        return ResponseEntity.noContent().build();
    }

    // @PatchMapping("/{id}")
    // public ResponseEntity<LinkResponseDTO> updateLink(@PathVariable UUID id, @RequestBody LinkRequestDTO dto) {
    //     return ResponseEntity.ok(linkService.updateLink(id, dto));
    // }
}
