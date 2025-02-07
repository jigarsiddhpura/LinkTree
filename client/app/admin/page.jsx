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
import { useProfile } from '@/contexts/ProfileContext';

export default function Home() {
    const { currentProfile, setCurrentProfile } = useProfile();

    const [userId, setUserId] = useState(null);
    const [links, setLinks] = useState([])
    const [linkOrder, setLinkOrder] = useState([])
    const [templateColor, setTemplateColor] = useState(null)
    
    const [previewSettings, setPreviewSettings] = useState({
        useGradientBackground: false,
        templateColor: templateColor,
    })

    useEffect(() => {
        setUserId(localStorage.getItem("userId"))
        // setTemplateColor(localStorage.getItem("templateColor"))
    }, [])

    useEffect(() => {
        if (!userId) return
        const fetchDefaultProfile = async () => {
            try {
                const response = await fetch(`https://linktree-backend-hky4.onrender.com/api/${userId}/profiles`)
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
        localStorage.setItem("currentProfileId", currentProfile?.id)
        const fetchLinks = async () => {
            try {
                const response = await fetch(`https://linktree-backend-hky4.onrender.com/api/profile/${currentProfile.id}/links`)
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

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <Header username={currentProfile.username} />

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
                    templateColor={currentProfile.templateColor}
                    settings={previewSettings}
                    onSettingsChange={setPreviewSettings}
                />
            </aside>
        </div>
    )
}

