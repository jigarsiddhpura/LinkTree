"use client"

import { Card, CardBody } from "@nextui-org/card"
import { format } from "date-fns"
// import { MetricConfig } from "@/types/analytics"

// interface ChartTooltipProps {
//     active?: boolean
//     payload?: any[]
//     label?: string
//     metrics: MetricConfig[]
// }

export function ChartTooltip({ active, payload, label, metrics }) {
    if (!active || !payload || !payload.length) return null

    return (
        <Card className="border-none bg-white/80 backdrop-blur-lg">
            <CardBody className="p-4">
                <p className="text-sm font-medium mb-2">
                    {format(new Date(label), "EEE, d MMM yyyy")} 
                </p>
                <div className="space-y-1">
                    {payload.map((entry, index) => {
                        const metric = metrics.find(m => m.key === entry.dataKey)
                        if (!metric) return null

                        return (
                            <div key={index} className="flex items-center gap-2">
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: metric.color }}
                                />
                                <span className="text-sm">{metric.label}:</span>
                                <span className="text-sm font-medium">{entry.value}</span>
                            </div>
                        )
                    })}
                </div>
            </CardBody>
        </Card>
    )
}

