package dev.jigar.linktree.service;

import dev.jigar.linktree.dto.AnalyticsDataPoint;
import dev.jigar.linktree.entity.Analytics;
import dev.jigar.linktree.entity.AnalyticsId;
import dev.jigar.linktree.entity.LinkAnalytics;
import dev.jigar.linktree.entity.LinkAnalyticsId;
import dev.jigar.linktree.repository.AnalyticsRepository;
import dev.jigar.linktree.repository.LinkAnalyticsRepository;
import dev.jigar.linktree.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
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
                AnalyticsDataPoint point = dataPoints.get(linkAnalytics.getRecordedDate());
                if (point != null) {
                    point.setClicks(linkAnalytics.getClicksCount());
                    point.setUniqueClicks(linkAnalytics.getUniqueClick());
                }
            });

        return new ArrayList<>(dataPoints.values());
    }

    @Transactional
    public void incrementProfileView(UUID profileId) {
        LocalDate today = LocalDate.now();
        AnalyticsId analyticsId = new AnalyticsId(profileId, today);

        Analytics analytics = analyticsRepository.findById(analyticsId)
                .orElseGet(() -> createInitialAnalytics(analyticsId));

        try {
            updateAnalyticsMetrics(analytics);
            analyticsRepository.save(analytics);
            // invalidateAnalyticsCache(profileId);
        } catch (OptimisticLockingFailureException e) {
            log.warn("Concurrent update detected for analytics - profileId: {}, retrying...", profileId);
            // retryAnalyticsUpdate(profileId);
        }
    }


    @Transactional
    public void incrementLinkClick(UUID linkId, UUID profileId) {
        LocalDate today = LocalDate.now();
        LinkAnalyticsId linkAnalyticsId = new LinkAnalyticsId(linkId, profileId, today);

        LinkAnalytics linkAnalytics = linkAnalyticsRepository.findById(linkAnalyticsId)
                .orElseGet(() -> createInitialLinkAnalytics(linkAnalyticsId));

        try {
            updateLinkAnalyticsMetrics(linkAnalytics);
            linkAnalyticsRepository.save(linkAnalytics);
            // invalidateLinkAnalyticsCache(linkId, profileId);
        } catch (OptimisticLockingFailureException e) {
            log.warn("Concurrent update detected for link analytics - linkId: {}, retrying...", linkId);
            // retryLinkAnalyticsUpdate(linkId, profileId);
        }
    }

    private Analytics createInitialAnalytics(AnalyticsId analyticsId) {
        return Analytics.builder()
                .id(analyticsId)
                .viewsCount(0)
                .uniqueVisitors(0)
                .lastUpdatedAt(LocalDateTime.now())
                .build();
    }

    private LinkAnalytics createInitialLinkAnalytics(LinkAnalyticsId linkAnalyticsId) {
        return LinkAnalytics.builder()
                .id(linkAnalyticsId)
                .clicksCount(0)
                .uniqueClick(0)
                .lastUpdatedAt(LocalDateTime.now())
                .build();
    }

    private void updateAnalyticsMetrics(Analytics analytics) {
        analytics.setViewsCount(analytics.getViewsCount() + 1);
        analytics.setUniqueVisitors(analytics.getUniqueVisitors() + 1);
        analytics.setLastUpdatedAt(LocalDateTime.now());
    }

    private void updateLinkAnalyticsMetrics(LinkAnalytics linkAnalytics) {
        linkAnalytics.setClicksCount(linkAnalytics.getClicksCount() + 1);
        linkAnalytics.setUniqueClick(linkAnalytics.getUniqueClick() + 1);
        linkAnalytics.setLastUpdatedAt(LocalDateTime.now());
    }

    // @Retryable(
    //     value = OptimisticLockingFailureException.class,
    //     maxAttempts = 3,
    //     backoff = @Backoff(delay = 100)
    // )
    // private void retryAnalyticsUpdate(UUID profileId) {
    //     incrementProfileView(profileId);
    // }

    // @Retryable(
    //     value = OptimisticLockingFailureException.class,
    //     maxAttempts = 3,
    //     backoff = @Backoff(delay = 100)
    // )
    // private void retryLinkAnalyticsUpdate(UUID linkId, UUID profileId) {
    //     incrementLinkClick(linkId, profileId);
    // }

    // private void invalidateAnalyticsCache(UUID profileId) {
    //     cacheManager.getCache("analytics-cache")
    //             .evictIfPresent(profileId);
    // }

    // private void invalidateLinkAnalyticsCache(UUID linkId, UUID profileId) {
    //     cacheManager.getCache("link-analytics-cache")
    //             .evictIfPresent(String.format("%s:%s", profileId, linkId));
    // }
}
