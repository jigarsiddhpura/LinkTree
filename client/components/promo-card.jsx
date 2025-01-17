"use client"

import { useState } from "react"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardFooter } from "@nextui-org/card"
import { Avatar } from "@nextui-org/avatar"
import { Chip } from "@nextui-org/chip"
import { ChevronDown } from 'lucide-react'
import { SwitchProfilesModal } from "./modals/switch-profiles-modal"

export function PromoCard({ userId, currentProfile, onProfileChange }) {
    const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false)

    return (
        <>
            <Button
                variant="light"
                className="w-full relative right-4 rounded-full py-6 px-4 border-2 border-slate-500"
                endContent={<ChevronDown className="w-4 h-4" />}
                onPress={() => setIsSwitchModalOpen(true)}
            >
                <div className="flex items-center gap-2">
                    <Avatar
                        name={currentProfile.username[0].toUpperCase()}
                        src={currentProfile.profileImage}
                        className="w-8 h-8"
                    />
                    <span className="text-sm">@{currentProfile.username}</span>
                    {/* <Chip size="sm" variant="flat" color="default">
                        Free
                    </Chip> */}
                </div>
            </Button>

            <SwitchProfilesModal
                isOpen={isSwitchModalOpen}
                onClose={() => setIsSwitchModalOpen(false)}
                userId={userId}
                onProfileSelect={onProfileChange}
            />
        </>
    )
}

