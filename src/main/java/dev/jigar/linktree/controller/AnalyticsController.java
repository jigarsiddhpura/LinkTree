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

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Slf4j
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    // /**
    //  * Returns total views for a profile (e.g., summing up all analytics rows).
    //  */
    // @GetMapping("/profile/{profileId}/views")
    // public ResponseEntity<Integer> getTotalViews(@PathVariable UUID profileId) {
    //     int totalViews = analyticsService.getTotalViews(profileId);
    //     return ResponseEntity.ok(totalViews);
    // }

    // /**
    //  * Returns total unique visitors for a profile.
    //  */
    // @GetMapping("/profile/{profileId}/unique-views")
    // public ResponseEntity<Integer> getTotalUniqueViews(@PathVariable UUID profileId) {
    //     int uniqueViews = analyticsService.getTotalUniqueViews(profileId);
    //     return ResponseEntity.ok(uniqueViews);
    // }

    // /**
    //  * Returns total clicks for a specific link or across the profile.
    //  */
    // @GetMapping("/link/{linkId}/clicks")
    // public ResponseEntity<Integer> getTotalLinkClicks(@PathVariable UUID linkId) {
    //     int totalClicks = analyticsService.getTotalLinkClicks(linkId);
    //     return ResponseEntity.ok(totalClicks);
    // }

    // /**
    //  * Returns lifetime (all-time) profile views, possibly the same as getTotalViews 
    //  * or you can differentiate if you store them in a different manner.
    //  */
    // @GetMapping("/profile/{profileId}/lifetime-views")
    // public ResponseEntity<Integer> getLifetimeViews(@PathVariable UUID profileId) {
    //     int lifetimeViews = analyticsService.getLifetimeViews(profileId);
    //     return ResponseEntity.ok(lifetimeViews);
    // }

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
}
