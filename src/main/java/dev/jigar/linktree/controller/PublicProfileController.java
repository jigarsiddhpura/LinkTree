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
import dev.jigar.linktree.dto.PublicProfileResponseDTO;
import dev.jigar.linktree.entity.Profile;
import dev.jigar.linktree.service.AnalyticsService;
import dev.jigar.linktree.service.LinkService;
import dev.jigar.linktree.service.ProfileService;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
public class PublicProfileController {

    @Autowired
    public LinkService linkService;

    @Autowired
    public ProfileService profileService;

    @GetMapping("/{username}")
    public ResponseEntity<PublicProfileResponseDTO> getLinksByProfile(@PathVariable String username) {
        UUID profileId = profileService.getProfileIdByUsername(username);
        Profile profile = profileService.getProfileById(profileId);

        List<LinkResponseDTO> links = linkService.getLinksByProfileSorted(profileId);
        // if (links.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(links);
        return ResponseEntity.ok(new PublicProfileResponseDTO(profile, links));
    }
}
