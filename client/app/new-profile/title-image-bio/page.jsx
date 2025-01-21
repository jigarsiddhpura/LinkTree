"use client"

import { useState } from "react"
import { Button } from "@nextui-org/button"
import { Input, Textarea } from "@nextui-org/input"
import { Progress } from "@nextui-org/progress"
import { Avatar } from "@nextui-org/avatar"
import { useRouter, useSearchParams } from "next/navigation"
import { Plus } from 'lucide-react'
import Link from "next/link"
import { Suspense } from "react"
import { templates, templateColorMap } from "@/lib/templates"

// interface ProfileData {
//     username: string
//     title: string
//     bio: string
//     profileImage: string
// }

const sampleAvatars = [
    { url: "/green-profile.webp", color: "bg-blue-400" },
    { url: "/red-profile.webp", color: "bg-red-400" },
    { url: "/blue-profile.webp", color: "bg-green-400" },
]

function ProfileContent({ params }) {
    const router = useRouter()
    const username = useSearchParams().get('username')
    const selectedTemplate = useSearchParams().get('selectedTemplate')

    const [selectedAvatar, setSelectedAvatar] = useState(null)
    const [formData, setFormData] = useState({
        username: username,
        title: "",
        bio: "",
        profileImage: "",
        templateColor: templateColorMap.get(selectedTemplate) || "white"
    })
    const [isLoading, setIsLoading] = useState(false)


    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const userId = localStorage.getItem("userId");
            alert(formData.templateColor);
            const response = await fetch(`https://api.inflow.chat/api/${userId}/profile/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    title: formData.title,
                    bio: formData.bio,
                    profileImage: formData.profileImage || sampleAvatars[selectedAvatar || 0]?.url,
                    templateColor: formData.templateColor,
                }),
            })  

            console.log(response.json())

            if (!response.ok) {
                throw new Error('Failed to create profile')
            }

            // const data = await response.json()
            router.push('/admin') // Redirect to dashboard after successful creation
        } catch (error) {
            console.error('Error creating profile:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid grid-cols-1 gap-6 p-6">
            {/* Header */}
            <header className="flex justify-between items-center">
                <Button
                    as={Link}
                    href="/new-profile/username"
                    variant="light"
                >
                    Back
                </Button>
                <Progress
                    value={66}
                    className="max-w-xs"
                    color="secondary"
                />
                <Button
                    as={Link}
                    href="/dashboard"
                    variant="light"
                >
                    Skip
                </Button>
            </header>

            {/* Main Content */}
            <main className="max-w-md mx-auto w-full space-y-8">
                <h1 className="text-4xl font-bold text-center">
                    Add profile details
                </h1>

                {/* Profile Image Selection */}
                <div className="space-y-4">
                    <p className="text-center">Select a profile image</p>
                    <div className="flex justify-center gap-4">
                        {sampleAvatars.map((avatar, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedAvatar(index)}
                                className={`relative rounded-full p-1 ${selectedAvatar === index ? 'ring-2 ring-purple-600' : ''
                                    }`}
                            >
                                <Avatar
                                    src={avatar.url}
                                    className={`w-16 h-16 ${avatar.color}`}
                                />
                            </button>
                        ))}
                        <button
                            onClick={() => {/* Handle custom upload */ }}
                            className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                        >
                            <Plus className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Profile Information */}
                <div className="space-y-6">
                    <p className="text-center">Add title and bio</p>
                    <Input
                        label="Profile title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        variant="bordered"
                    />
                    <Textarea
                        label="Bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        variant="bordered"
                        maxRows={3}
                        maxLength={80}
                        endContent={
                            <div className="absolute bottom-1 right-1 text-small text-default-400">
                                {formData.bio?.length || 0}/80
                            </div>
                        }
                    />
                </div>

                {/* Continue Button */}
                <Button
                    className="w-full bg-purple-600 text-white"
                    size="lg"
                    radius="full"
                    isLoading={isLoading}
                    onPress={handleSubmit}
                >
                    Continue
                </Button>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-6 left-6">
                <Button
                    variant="light"
                    className="text-gray-500 text-sm"
                >
                    Cookie preferences
                </Button>
            </footer>
        </div>
    )
}

export default function ProfileSetup({ params }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfileContent params={params} />
        </Suspense>
    )
}

