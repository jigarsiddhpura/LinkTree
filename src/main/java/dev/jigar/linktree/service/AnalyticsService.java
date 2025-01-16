package dev.jigar.linktree.service;

import dev.jigar.linktree.entity.Analytics;
import dev.jigar.linktree.entity.LinkAnalytics;
import dev.jigar.linktree.repository.AnalyticsRepository;
import dev.jigar.linktree.repository.LinkAnalyticsRepository;
import dev.jigar.linktree.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AnalyticsService {

    @Autowired
    private AnalyticsRepository analyticsRepository;

    @Autowired
    private LinkAnalyticsRepository linkAnalyticsRepository;

    public int getTotalViews(UUID profileId) {
        List<Analytics> analyticsList = analyticsRepository.findAll();
        return analyticsList.stream()
                .filter(a -> a.getProfile().getId().equals(profileId))
                .mapToInt(Analytics::getViewsCount)
                .sum();
    }

    public int getTotalUniqueViews(UUID profileId) {
        List<Analytics> analyticsList = analyticsRepository.findAll();
        return analyticsList.stream()
                .filter(a -> a.getProfile().getId().equals(profileId))
                .mapToInt(Analytics::getUniqueVisitors)
                .sum();
    }

    public int getTotalLinkClicks(UUID linkId) {
        List<LinkAnalytics> linkAnalyticsList = linkAnalyticsRepository.findAll();
        return linkAnalyticsList.stream()
                .filter(la -> la.getLink().getId().equals(linkId))
                .mapToInt(LinkAnalytics::getClicksCount)
                .sum();
    }

    public int getLifetimeViews(UUID profileId) {
        // This could be the same as getTotalViews, or a distinct calculation
        return getTotalViews(profileId);
    }

    public Object getProfileStats(UUID profileId) {
        // Return any kind of aggregation or custom object
        return new Object() {
            public int totalViews = getTotalViews(profileId);
            public int uniqueViews = getTotalUniqueViews(profileId);
        };
    }
}
