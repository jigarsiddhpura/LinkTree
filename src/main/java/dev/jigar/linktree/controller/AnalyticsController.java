package dev.jigar.linktree.controller;

import dev.jigar.linktree.dto.AnalyticsDataPoint;
import dev.jigar.linktree.service.AnalyticsService;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/analytics")
@Slf4j
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    // Combined single endpoint for a profile
    @GetMapping("/profile/{profileIdStr}/stats")
    public ResponseEntity<List<AnalyticsDataPoint>> getProfileStats(
        @PathVariable String profileIdStr,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate start,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate end) {
            
        UUID profileId = null;
        try {
            profileId = UUID.fromString(profileIdStr);
        } catch (Exception e) {
            log.error("Invalid profile ID: " + profileIdStr);
        }
        return ResponseEntity.ok(analyticsService.getAnalytics(profileId, start, end));
    }

    @PostMapping("/profile/{profileId}/view")
    public ResponseEntity<Void> recordProfileView(@PathVariable UUID profileId) {
        
        // CompletableFuture.runAsync(() -> {
            try {
                analyticsService.incrementProfileView(profileId);
                log.debug("Profile view recorded successfully for profileId: {}", profileId);
            } catch (Exception e) {
                log.error("Error recording profile view for profileId: {}", profileId, e);
                // Consider implementing a retry mechanism or dead letter queue
            }
        // });

        return ResponseEntity.accepted().build();
    }

    @PostMapping("/profile/{profileId}/link/{linkId}/click")
    public ResponseEntity<Void> recordLinkClick(@PathVariable UUID profileId,@PathVariable UUID linkId) {
        // CompletableFuture.runAsync(() -> {
            try {
                analyticsService.incrementLinkClick(linkId, profileId);
                log.debug("Link click recorded successfully for linkId: {}, profileId: {}", linkId, profileId);
            } catch (Exception e) {
                log.error("Error recording link click for linkId: {}, profileId: {}", linkId, profileId, e);
            }
        // });

        return ResponseEntity.accepted().build();
    }
}
