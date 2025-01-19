"use client"

import { useState, useEffect } from "react"
import { Button } from "@nextui-org/button"
import { MoreHorizontal } from 'lucide-react'
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ProfileInfo } from "@/components/profile/profile-info"
import { LinkCollection } from "@/components/links/link-collection"
import { MobilePreview } from "@/components/preview/mobile-preview"
import { PromoCard } from "@/components/promo-card"

export default function Home() {
    const [userId, setUserId] = useState(null);
    const [currentProfile, setCurrentProfile] = useState(null)
    const [links, setLinks] = useState([])
    const [linkOrder, setLinkOrder] = useState([])
    const [previewSettings, setPreviewSettings] = useState({
        useGradientBackground: false,
        templateColor: localStorage.getItem("templateColor"),
    })

    useEffect(() => {
        setUserId(localStorage.getItem("userId"))
    }, [])

    useEffect(() => {
        if (!userId) return
        const fetchDefaultProfile = async () => {
            try {
                const response = await fetch(`https://api.inflow.chat/api/${userId}/profiles`)
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

    useEffect(() => {
        if (!currentProfile) return
        const fetchLinks = async () => {
            try {
                const response = await fetch(`https://api.inflow.chat/api/profile/${currentProfile.id}/links`)
                if (!response.ok) throw new Error('Failed to fetch links')
                const fetchedLinks = await response.json()
                setLinks(fetchedLinks)
                setLinkOrder(fetchedLinks.map((link) => link.id))
            } catch (error) {
                console.error('Error fetching links:', error)
            }
        }

        fetchLinks()
    }, [currentProfile])

    if (!userId || !currentProfile) return null

    // Example profile data - replace with your actual data
    const profile = {
        username: "amazon_sambhav_deployments",
        bio: "Add bio",
        links: [
            {
                id: "1",
                title: "High Level Design and Architecture - Tech Titans",
                url: "https://youtu.be/kZbCXOpbeVQ",
                thumbnail: "/thumbnails/architecture.jpg",
                isVisible: true,
                clicks: 6,
                position: 0
            },
            {
                id: "2",
                title: "ML Workflow - Amazon Sambhav Submission",
                url: "https://youtu.be/OqFjspgDMgg",
                thumbnail: "/thumbnails/ml-workflow.jpg",
                isVisible: true,
                clicks: 3,
                position: 1
            }
        ]
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <Header />

                    <div className="flex items-start justify-between mb-8">
                        <ProfileInfo currentProfile={currentProfile} />
                        <Button
                            isIconOnly
                            variant="light"
                            aria-label="More options"
                        >
                            <MoreHorizontal className="w-5 h-5" />
                        </Button>
                    </div>

                    <LinkCollection
                        currentProfileId={currentProfile.id}
                        links={links}
                        onLinkChange={setLinks}
                        linkOrder={linkOrder}
                        onLinkOrderChange={setLinkOrder}
                    />
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
                <MobilePreview
                    links={links}
                    username={currentProfile.username}
                    bio={currentProfile.bio}
                    settings={previewSettings}
                    onSettingsChange={setPreviewSettings}
                />
            </aside>
        </div>
    )
}

