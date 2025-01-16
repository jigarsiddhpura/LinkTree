"use client"

import { Button } from "@nextui-org/button"
import { Instagram, Youtube, Mail, Plus } from 'lucide-react'
import { TikTok } from "./tiktok-icon"

const socialIcons = [
    { icon: Instagram, label: "Instagram" },
    { icon: TikTok, label: "TikTok" },
    { icon: Youtube, label: "YouTube" },
    { icon: Mail, label: "Email" }
]

export function SocialIcons() {
    return (
        <div className="flex gap-1 items-center relative right-2">
            {socialIcons.map((social) => (
                <Button
                    key={social.label}
                    isIconOnly
                    variant="light"
                    className="text-gray-300 hover:text-gray-700 rounded-full"
                    aria-label={social.label}
                >
                    <social.icon className="w-5 h-5" />
                </Button>
            ))}
            <Button
                isIconOnly
                variant="light"
                className="text-gray-500 hover:text-gray-700 rounded-full"
                aria-label="Add social"
            >
                <Plus className="w-5 h-5" />
            </Button>
        </div>
    )
}

