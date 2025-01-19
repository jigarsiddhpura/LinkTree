package dev.jigar.linktree.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.jigar.linktree.dto.LinkResponseDTO;
import dev.jigar.linktree.service.LinkService;
import dev.jigar.linktree.service.ProfileService;

@RestController
@RequestMapping
public class PublicProfileController {

    @Autowired
    public LinkService linkService;

    @Autowired
    public ProfileService profileService;

    @GetMapping("/{username}")
    public ResponseEntity<List<LinkResponseDTO>> getLinksByProfile(@PathVariable String username) {
        UUID profileId = profileService.getProfileIdByUsername(username);
        List<LinkResponseDTO> links = linkService.getLinksByProfileSorted(profileId);
        // if (links.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(links);
        return ResponseEntity.ok(links);
    }
}
