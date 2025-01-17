package dev.jigar.linktree.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import dev.jigar.linktree.dto.LinkRequestDTO;
import dev.jigar.linktree.dto.LinkResponseDTO;
import dev.jigar.linktree.dto.ProfileRequestDTO;
import dev.jigar.linktree.dto.ProfileResponseDTO;
import dev.jigar.linktree.service.LinkService;
import dev.jigar.linktree.service.ProfileService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private LinkService linkService;

    @GetMapping("/{userId}/profile/count")
    public ResponseEntity<Map<String, Integer>> getProfileCount(@PathVariable UUID userId) {
        try {
            int count = profileService.profileCount(userId);
            return ResponseEntity.ok(Map.of("count", count));
        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/{userId}/profile/create")
    public ResponseEntity<ProfileResponseDTO> createProfile(@PathVariable UUID userId, @RequestBody ProfileRequestDTO dto) {
        ProfileResponseDTO responseDto = profileService.createProfile(dto, userId);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{userId}/profiles")
    public List<ProfileResponseDTO> getProfilesForUser(@PathVariable UUID userId) {
        return profileService.getAllProfilesForUser(userId);
    }

    // Returns all links for this profile, sorted by position.
    @GetMapping("/profile/{profileIdStr}/links")
    public ResponseEntity<List<LinkResponseDTO>> getLinksByProfile(@PathVariable String profileIdStr) {
        UUID profileId = UUID.fromString(profileIdStr);
        List<LinkResponseDTO> links = linkService.getLinksByProfileSorted(profileId);
        // if (links.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(links);
        return ResponseEntity.ok(links);
    }

    // Accepts an array of link IDs in the new order => updates positions in DB.
    @PutMapping("/profile/{profileId}/links/order")
    public ResponseEntity<?> updateLinkOrder(@PathVariable UUID profileId,
            @RequestBody Map<String, List<UUID>> body) {

        // { "linkOrder": [uuid1, uuid2, ...] }
        List<UUID> linkOrder = body.get("linkOrder");
        if (linkOrder == null) {
            return ResponseEntity.badRequest().body("Missing 'linkOrder' field");
        }

        linkService.updateLinkPositions(profileId, linkOrder);
        return ResponseEntity.ok("Link order updated successfully");
    }

}
