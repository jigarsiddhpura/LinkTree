"use client"

import { useState, useMemo } from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts"
import { format } from "date-fns"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { MetricsToggle } from "./metrics-toggle"
import { ChartTooltip } from "./chart-tooltip"
// import { AnalyticsDataPoint, MetricConfig } from "@/types/analytics"

// interface AnalyticsChartProps {
//     data: AnalyticsDataPoint[]
// }

const METRICS = [
    { key: "views", label: "Views", color: "#0091FF" },
    { key: "uniqueViews", label: "Unique views", color: "#0091FF", strokeDasharray: "4 4" },
    { key: "clicks", label: "Clicks", color: "#FF00FF" },
    { key: "uniqueClicks", label: "Unique clicks", color: "#FF0000", strokeDasharray: "4 4" }
]

export function AnalyticsChart({ data }) {
    const [activeMetrics, setActiveMetrics] = useState (
        new Set(METRICS.map(m => m.key))
    )

    const toggleMetric = (metric) => {
        const newActiveMetrics = new Set(activeMetrics)
        if (newActiveMetrics.has(metric)) {
            newActiveMetrics.delete(metric)
        } else {
            newActiveMetrics.add(metric)
        }
        setActiveMetrics(newActiveMetrics)
    }

    // Calculate total views and clicks
    const totals = useMemo(() => {
        return data.reduce((acc, curr) => ({
            views: acc.views + curr.views,
            clicks: acc.clicks + curr.clicks
        }), { views: 0, clicks: 0 })
    }, [data])

    return (
        <Card className="w-full">
            <CardHeader className="flex justify-between items-center px-6 py-4">
                <div className="space-x-6">
                    <span>Views: {totals.views}</span>
                    <span>Clicks: {totals.clicks}</span>
                </div>
                <span className="text-default-400">Daily</span>
            </CardHeader>
            <Divider />
            <CardBody className="p-6">
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(value) => format(new Date(value), "EEE d")}
                            />
                            <YAxis />
                            <Tooltip
                                content={({ active, payload, label }) => (
                                    <ChartTooltip
                                        active={active}
                                        payload={payload}
                                        label={label}
                                        metrics={METRICS}
                                    />
                                )}
                            />
                            {METRICS.map((metric) => (
                                activeMetrics.has(metric.key) && (
                                    <Line
                                        key={metric.key}
                                        type="monotone"
                                        dataKey={metric.key}
                                        stroke={metric.color}
                                        strokeWidth={2}
                                        dot={{ r: 4, fill: metric.color }}
                                        strokeDasharray={metric.strokeDasharray}
                                    />
                                )
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <Divider className="my-6" />
                <MetricsToggle
                    metrics={METRICS}
                    activeMetrics={activeMetrics}
                    onToggle={toggleMetric}
                />
            </CardBody>
        </Card>
    )
}

