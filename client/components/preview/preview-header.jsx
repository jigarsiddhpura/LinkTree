import { Avatar } from "@nextui-org/avatar"
import { Button } from "@nextui-org/button"
import { Instagram, Youtube, Mail, Plus } from 'lucide-react'
import { TikTok } from "../profile/tiktok-icon"

export function PreviewHeader({ username, profileImage, bio }) {
    const socialIcons = [
        { icon: Instagram, label: "Instagram" },
        { icon: TikTok, label: "TikTok" },
        { icon: Youtube, label: "YouTube" },
        { icon: Mail, label: "Email" }
    ]

    return (
        <div className="flex flex-col items-center mb-6 text-white">
            <Avatar
                src={profileImage}
                name={username[0].toUpperCase()}
                className="w-20 h-20 text-large mb-4 bg-white"
            />
            <h2 className="text-lg font-semibold mb-1">@{username}</h2>
            {bio && <p className="text-sm text-white/70 text-center mb-4">{bio}</p>}
            <div className="flex gap-2">
                {socialIcons.map((social) => (
                    <Button
                        key={social.label}
                        isIconOnly
                        variant="flat"
                        className="bg-white/10"
                        size="sm"
                    >
                        <social.icon className="w-4 h-4" />
                    </Button>
                ))}
            </div>
        </div>
    )
}

