package dev.jigar.linktree.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class DateRangeDTO {
    private LocalDate start;
    private LocalDate end;
}
