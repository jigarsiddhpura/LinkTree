"use client"

import { Checkbox } from "@nextui-org/checkbox"
// import { MetricConfig } from "@/types/analytics"

// interface MetricsToggleProps {
//     metrics: MetricConfig[]
//     activeMetrics: Set<string>
//     onToggle: (metric: string) => void
// }

export function MetricsToggle({ metrics, activeMetrics, onToggle }) {
    return (
        <div className="flex flex-wrap gap-4">
            {metrics.map((metric) => (
                <Checkbox
                    key={metric.key}
                    isSelected={activeMetrics.has(metric.key)}
                    onValueChange={() => onToggle(metric.key)}
                    color="primary"
                    classNames={{
                        label: "flex items-center gap-2",
                    }}
                >
                    <span
                        className="inline-block w-3 h-3 rounded-full"
                        style={{ backgroundColor: metric.color }}
                    />
                    {metric.label}
                </Checkbox>
            ))}
        </div>
    )
}

