package dev.jigar.linktree.service;

import dev.jigar.linktree.dto.AnalyticsDataPoint;
import dev.jigar.linktree.entity.Analytics;
import dev.jigar.linktree.entity.LinkAnalytics;
import dev.jigar.linktree.repository.AnalyticsRepository;
import dev.jigar.linktree.repository.LinkAnalyticsRepository;
import dev.jigar.linktree.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalyticsService {

    @Autowired
    private AnalyticsRepository analyticsRepository;

    @Autowired
    private LinkAnalyticsRepository linkAnalyticsRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_DATE;

    // public int getTotalViews(UUID profileId) {
    //     List<Analytics> analyticsList = analyticsRepository.findAll();
    //     return analyticsList.stream()
    //             .filter(a -> a.getProfile().getId().equals(profileId))
    //             .mapToInt(Analytics::getViewsCount)
    //             .sum();
    // }

    // public int getTotalUniqueViews(UUID profileId) {
    //     List<Analytics> analyticsList = analyticsRepository.findAll();
    //     return analyticsList.stream()
    //             .filter(a -> a.getProfile().getId().equals(profileId))
    //             .mapToInt(Analytics::getUniqueVisitors)
    //             .sum();
    // }

    // public int getTotalLinkClicks(UUID linkId) {
    //     List<LinkAnalytics> linkAnalyticsList = linkAnalyticsRepository.findAll();
    //     return linkAnalyticsList.stream()
    //             .filter(la -> la.getLink().getId().equals(linkId))
    //             .mapToInt(LinkAnalytics::getClicksCount)
    //             .sum();
    // }

    // public int getLifetimeViews(UUID profileId) {
    //     // This could be the same as getTotalViews, or a distinct calculation
    //     return getTotalViews(profileId);
    // }

    public List<AnalyticsDataPoint> getAnalytics(UUID profileId, LocalDate startDate, LocalDate endDate) {
        Map<LocalDate, AnalyticsDataPoint> dataPoints = new TreeMap<>();
        
        // Initialize data points for each date in range
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            AnalyticsDataPoint point = new AnalyticsDataPoint();
            point.setDate(date.format(DATE_FORMATTER));
            dataPoints.put(date, point);
        }

        // Populate views data
        analyticsRepository.findByProfileIdAndDateRange(profileId, startDate, endDate)
            .forEach(analytics -> {
                AnalyticsDataPoint point = dataPoints.get(analytics.getRecordedDate());
                if (point != null) {
                    point.setViews(analytics.getViewsCount());
                    point.setUniqueViews(analytics.getUniqueVisitors());
                }
            });

        // Populate clicks data
        linkAnalyticsRepository.findByProfileIdAndDateRange(profileId, startDate, endDate)
            .forEach(linkAnalytics -> {
                AnalyticsDataPoint point = dataPoints.get(linkAnalytics.getCreatedAt());
                if (point != null) {
                    point.setClicks(linkAnalytics.getClicksCount());
                    point.setUniqueClicks(linkAnalytics.getUniqueClick());
                }
            });

        return new ArrayList<>(dataPoints.values());
    }
}
