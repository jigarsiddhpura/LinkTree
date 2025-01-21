"use client"

import { useState, useEffect } from "react"
import { useProfile } from '@/contexts/ProfileContext';
import { DateRangeSelector } from "@/components/analytics/date-range-selector"
import { AnalyticsChart } from "@/components/analytics/analytics-chart"
import { Sidebar } from "@/components/layout/sidebar"
// import { DateRange, AnalyticsDataPoint } from "@/types/analytics"
import { subDays, endOfDay } from "date-fns"

export default function AnalyticsPage() {
    const { currentProfile } = useProfile(); // NOT WORKING, SO STORING IN LOCAL STORAGE

    const [dateRange, setDateRange] = useState({
        start: subDays(new Date(), 7),
        end: endOfDay(new Date())
    })
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchAnalytics = async () => {
            setIsLoading(true)
            const currentProfileId = localStorage.getItem("currentProfileId")

            try {
                const response = await fetch(`https://api.inflow.chat/api/analytics/profile/${currentProfilecurrentProfileId}/stats?start=${dateRange.start.toISOString()}&end=${dateRange.end.toISOString()}`)
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
            <Sidebar />

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

