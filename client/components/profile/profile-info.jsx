"use client"

import { Input } from "@nextui-org/input"
import { ProfileAvatar } from "./avatar"
import { SocialIcons } from "./social-icons"

export function ProfileInfo({currentProfile}) {
    return (
        <div className="flex gap-6">
            <ProfileAvatar />
            <div className="flex flex-col gap-1">
                <p className="font-bold">{currentProfile.title}</p>
                <p className="text-gray-500">{currentProfile.bio}</p>
                <SocialIcons />
            </div>
        </div>
    )
}

