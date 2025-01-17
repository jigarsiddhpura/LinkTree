"use client"

import { Avatar } from "@nextui-org/avatar"
import { Button } from "@nextui-org/button"
import { Pencil } from 'lucide-react'

export function ProfileAvatar() {
    return (
        <div className="relative">
            <Avatar
                className="w-16 h-16 text-large bg-black text-white relative top-3"
                name="TI"
                showFallback
            />
            <Button
                isIconOnly
                className="absolute bottom-2 -right-1 bg-white rounded-full shadow-lg p-2 border"
                size="sm"
            >
                <Pencil className="w-4 h-4" />
            </Button>
        </div>
    )
}

