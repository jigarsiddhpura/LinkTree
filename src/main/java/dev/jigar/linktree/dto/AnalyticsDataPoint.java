package dev.jigar.linktree.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsDataPoint {
    private String date;
    private int views;
    private int uniqueViews;
    private int clicks;
    private int uniqueClicks;
}
