package dev.jigar.linktree.controller;

import dev.jigar.linktree.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    /**
     * Returns total views for a profile (e.g., summing up all analytics rows).
     */
    @GetMapping("/profile/{profileId}/views")
    public ResponseEntity<Integer> getTotalViews(@PathVariable UUID profileId) {
        int totalViews = analyticsService.getTotalViews(profileId);
        return ResponseEntity.ok(totalViews);
    }

    /**
     * Returns total unique visitors for a profile.
     */
    @GetMapping("/profile/{profileId}/unique-views")
    public ResponseEntity<Integer> getTotalUniqueViews(@PathVariable UUID profileId) {
        int uniqueViews = analyticsService.getTotalUniqueViews(profileId);
        return ResponseEntity.ok(uniqueViews);
    }

    /**
     * Returns total clicks for a specific link or across the profile.
     */
    @GetMapping("/link/{linkId}/clicks")
    public ResponseEntity<Integer> getTotalLinkClicks(@PathVariable UUID linkId) {
        int totalClicks = analyticsService.getTotalLinkClicks(linkId);
        return ResponseEntity.ok(totalClicks);
    }

    /**
     * Returns lifetime (all-time) profile views, possibly the same as getTotalViews 
     * or you can differentiate if you store them in a different manner.
     */
    @GetMapping("/profile/{profileId}/lifetime-views")
    public ResponseEntity<Integer> getLifetimeViews(@PathVariable UUID profileId) {
        int lifetimeViews = analyticsService.getLifetimeViews(profileId);
        return ResponseEntity.ok(lifetimeViews);
    }

    /**
     * (Optional) For demonstration: return multiple metrics in a single call.
     */
    @GetMapping("/profile/{profileId}/stats")
    public ResponseEntity<?> getProfileStats(@PathVariable UUID profileId) {
        // Could return a custom StatsDTO containing various analytics
        return ResponseEntity.ok(analyticsService.getProfileStats(profileId));
    }
}
