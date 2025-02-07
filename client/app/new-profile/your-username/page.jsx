"use client"

import { useState, useEffect } from "react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { ArrowLeft } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function ChooseUsername() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [isUnique, setIsUnique] = useState(true)
    const [isChecking, setIsChecking] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    // Debounced username check
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (username) {
                checkUsername(username)
            }
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [username])

    const checkUsername = async (value) => {
        setIsChecking(true)
        try {
            const response = await fetch(`https://linktree-backend-hky4.onrender.com/api/profile/check-username/${value}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )

            const isUnique = await response.json()
            setIsUnique(isUnique)
            setErrorMessage(isUnique ? "" : "This username is already taken")
        } catch (error) {
            setErrorMessage("Error checking username availability")
            setIsUnique(false)
        } finally {
            setIsChecking(false)
        }
    }

    const handleSubmit = async () => {
        if (!username || !isUnique) return
        
        try {
            // const encodedUsername = encodedURIComponent(username);
            // alert(encodedUsername)
            router.push(`/new-profile/select-template?username=${username}`)

        } catch (error) {
            setErrorMessage("Error creating profile")
        }
    }

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 lg:p-12">
                <div className="max-w-md mx-auto">
                    <div className="mb-8">
                        <Link href="/" className="inline-flex items-center">
                            <span className="text-2xl font-bold">Linktree</span>
                            <span className="text-2xl text-[#26F46C]">*</span>
                        </Link>
                    </div>

                    <Link
                        href="/admin"
                        className="inline-flex items-center text-purple-600 mb-12 hover:underline"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to admin
                    </Link>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold">
                            Choose a username
                        </h1>
                        <p className="text-gray-600">
                            Choose a Linktree URL for your new Linktree. You can always change it later.
                        </p>

                        <div className="mt-8">
                            <Input
                                label=""
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                labelPlacement="outside"
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">linktr.ee/</span>
                                    </div>
                                }
                                isInvalid={!isUnique}
                                errorMessage={errorMessage}
                                className="max-w-md"
                            />
                        </div>

                        <Button
                            className={`w-full mt-4 ${isUnique && username
                                    ? 'bg-[#DDDCCF] hover:bg-[#CFCEC1]'
                                    : 'bg-[#EBEADD]'
                                } text-gray-700`}
                            size="lg"
                            radius="full"
                            onPress={handleSubmit}
                            isDisabled={!isUnique || !username}
                            isLoading={isChecking}
                        >
                            Continue
                        </Button>
                    </div>
                </div>

                <div className="absolute bottom-6 left-6">
                    <Button
                        variant="light"
                        className="text-gray-500 text-sm"
                    >
                        Cookie preferences
                    </Button>
                </div>
            </div>

            <div className="hidden lg:block relative bg-[#E6B32A]">
                <Image
                    src="/signup-grid-image.png"
                    alt="Decorative Linktree interface"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </div>
    )
}