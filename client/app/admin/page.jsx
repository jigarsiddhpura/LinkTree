"use client"

import { useState, useEffect } from "react"
import { Button } from "@nextui-org/button"
import { MoreHorizontal, Plus } from 'lucide-react'
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ProfileInfo } from "@/components/profile/profile-info"
import { LinkCollection } from "@/components/links/link-collection"
import { MobilePreview } from "@/components/preview/mobile-preview"
import { PromoCard } from "@/components/promo-card"

export default function Home() {
    const [userId, setUserId] = useState(null);
    const [currentProfile, setCurrentProfile] = useState(null)

    useEffect(() => {
        setUserId(localStorage.getItem("userId"))
    }, [])

    useEffect(() => {
        if (!userId) return
        const fetchDefaultProfile = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/${userId}/profiles`)
                if (!response.ok) throw new Error('Failed to fetch profiles')
                const profiles = await response.json()
                if (profiles.length > 0) {
                    setCurrentProfile(profiles[0])
                }
            } catch (error) {
                console.error('Error fetching default profile:', error)
            }
        }

        fetchDefaultProfile()
    }, [userId])

    if (!userId || !currentProfile) return null

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <Header />

                    <div className="flex items-start justify-between mb-8">
                        <ProfileInfo currentProfile={currentProfile}/>
                        <Button
                            isIconOnly
                            variant="light"
                            aria-label="More options"
                        >
                            <MoreHorizontal className="w-5 h-5" />
                        </Button>
                    </div>

                    <LinkCollection currentProfileId={currentProfile.id}/>
                </div>

                <div className="fixed bottom-8 left-8">
                    <PromoCard
                        userId={userId}
                        currentProfile={currentProfile}
                        onProfileChange={setCurrentProfile}
                    />
                </div>
            </main>

            <aside className="w-[400px] p-8 flex items-center justify-center">
                <MobilePreview links={[]} />
            </aside>
        </div>
    )
}

