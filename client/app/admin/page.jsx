"use client"

import { Button } from "@nextui-org/button"
import { MoreHorizontal } from 'lucide-react'
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ProfileInfo } from "@/components/profile/profile-info"
import { LinkCollection } from "@/components/links/link-collection"
import { MobilePreview } from "@/components/preview/mobile-preview"
import { PromoCard } from "@/components/promo-card"

export default function Home() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <Header />

                    <div className="flex items-start justify-between mb-8">
                        <ProfileInfo />
                        <Button
                            isIconOnly
                            variant="light"
                            aria-label="More options"
                        >
                            <MoreHorizontal className="w-5 h-5" />
                        </Button>
                    </div>

                    <LinkCollection />
                </div>

                <div className="fixed bottom-8 left-8">
                    <PromoCard />
                </div>
            </main>

            <aside className="w-[400px] p-8 flex items-center justify-center">
                <MobilePreview links={[]} />
            </aside>
        </div>
    )
}

