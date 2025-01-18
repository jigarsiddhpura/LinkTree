"use client"

import { useEffect, useState, useMemo } from "react"
import { Switch } from "@nextui-org/switch"
import { PreviewLink } from "./preview-link"
import { PreviewHeader } from "./preview-header"

export function MobilePreview({
    links,
    username,
    profileImage,
    bio,
    settings = { useGradientBackground: false },
    onSettingsChange
}) {
    // Memoize visible links to prevent unnecessary re-renders
    const visibleLinks = useMemo(() => {
        return links
            .filter(link => link.isVisible)
            .sort((a, b) => a.position - b.position)
    }, [links])

    // Generate background style based on settings
    const backgroundStyle = useMemo(() => {
        if (settings.useGradientBackground && settings.gradientColors) {
            return {
                background: `linear-gradient(to bottom, ${settings.gradientColors.from}, ${settings.gradientColors.to})`
            }
        }
        return {
            background: "#cacaca"
        }
    }, [settings])

    return (
        <div className="relative w-[400px]">
            {/* Settings Controls */}
            <div className="relative flex left-12 items-center gap-2 mb-4">
                <Switch
                    isSelected={settings.useGradientBackground}
                    onValueChange={(checked) =>
                        onSettingsChange?.({
                            ...settings,
                            useGradientBackground: checked,
                            gradientColors: checked
                                ? { from: "#FF0080", to: "#7928CA" }
                                : undefined
                        })
                    }
                >
                    Gradient Background
                </Switch>
            </div>

            {/* Device Frame */}
            <div className="relative w-[90%] h-[610px] rounded-[40px] overflow-auto shadow-xl">
                {/* Background */}
                <div
                    className="absolute inset-0 transition-colors duration-500"
                    style={backgroundStyle}
                />

                {/* Content Container */}
                <div className="relative h-full overflow-y-auto px-4 py-8">
                    {/* Profile Header */}
                    <PreviewHeader
                        username={username}
                        profileImage={profileImage}
                        bio={bio}
                    />

                    {/* Links */}
                    <div className="space-y-3">
                        {visibleLinks.map((link) => (
                            <PreviewLink key={link.id} link={link} />
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <span className="text-white/50 text-sm">
                            Linktree
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

