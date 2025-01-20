"use client"

import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal"
import { Avatar } from "@nextui-org/avatar"
import { Button } from "@nextui-org/button"
import { Chip } from "@nextui-org/chip"
import { useEffect, useState } from "react"
import {useRouter} from "next/navigation"

// interface SwitchProfilesModalProps {
//     isOpen: boolean
//     onClose: () => void
//     userId: string
//     onProfileSelect: (profile: Profile) => void
// }

export function SwitchProfilesModal({
    isOpen,
    onClose,
    userId,
    onProfileSelect
}) {
    const [profiles, setProfiles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter();

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch(`https://api.inflow.chat/api/${userId}/profiles`)
                if (!response.ok) throw new Error('Failed to fetch profiles')
                const data = await response.json()
                setProfiles(data)
            } catch (error) {
                console.error('Error fetching profiles:', error)
            } finally {
                setIsLoading(false)
            }
        }

        if (isOpen) {
            fetchProfiles()
        }
    }, [userId, isOpen])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="center"
            size="2xl"
        >
            <ModalContent>
                <ModalHeader className="text-xl font-bold">
                    Switch Linktrees
                </ModalHeader>
                <ModalBody className="pb-6">
                    <div className="space-y-2 flex flex-col">
                        {profiles.map((profile) => (
                            <Button
                                key={profile.id}
                                className="w-full p-4 h-auto"
                                variant="light"
                                onPress={() => {
                                    onProfileSelect(profile)
                                    onClose()
                                }}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-3">
                                        <Avatar
                                            name={profile.username[0].toUpperCase()}
                                            src={profile.profileImage}
                                            className="w-10 h-10 text-large bg-gray-200"
                                        />
                                        <div className="text-left">
                                            <p className="font-semibold">{profile.username}</p>
                                            <p className="text-sm text-gray-500">
                                                inflow.chat/{profile.username}
                                            </p>
                                        </div>
                                    </div>
                                    <Chip size="sm" variant="flat" color="default">
                                        Free
                                    </Chip>
                                </div>
                            </Button>
                        ))}
                        <Button
                            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg justify-center"
                            radius="full"
                            onPress={() => router.push(`/new-profile/your-username`)}
                        >
                            Create new Linktree
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

