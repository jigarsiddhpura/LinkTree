"use client"

import { useState, useEffect } from "react"
import { DateRangeSelector } from "@/components/analytics/date-range-selector"
import { AnalyticsChart } from "@/components/analytics/analytics-chart"
import { Sidebar } from "@/components/layout/sidebar"
// import { DateRange, AnalyticsDataPoint } from "@/types/analytics"
import { subDays } from "date-fns"

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState({
        start: subDays(new Date(), 7),
        end: new Date()
    })
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchAnalytics = async () => {
            setIsLoading(true)
            try {
                alert("start = "+dateRange.start.toISOString()+", end = "+dateRange.end.toISOString())
                const response = await fetch(`http://localhost:8080/api/analytics/profile/637e6c2b-8322-4605-9801-2d33011cc58e/stats?start=${dateRange.start.toISOString()}&end=${dateRange.end.toISOString()}`)
                if (!response.ok) throw new Error('Failed to fetch analytics')
                const data = await response.json()
                setData(data)
            } catch (error) {
                console.error('Error fetching analytics:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchAnalytics()
    }, [dateRange])

    return (
        <div className="flex min-h-screen">
            <Sidebar/>
            
            <div className="min-h-screen min-w-[83%] bg-gray-50">
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="py-4 flex items-center justify-between">
                            <h1 className="text-2xl font-semibold">Analytics</h1>
                            <DateRangeSelector
                                value={dateRange}
                                onChange={setDateRange}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-8">
                        <AnalyticsChart data={data} />
                    </div>
                </main>
            </div>
        </div>
    )
}

