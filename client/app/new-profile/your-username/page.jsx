"use client"

import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { ArrowLeft } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function ChooseUsername() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column */}
            <div className="p-6 lg:p-12">
                <div className="max-w-md mx-auto">
                    {/* Logo */}
                    <div className="mb-8">
                        <Link href="/" className="inline-flex items-center">
                            <span className="text-2xl font-bold">Linktree</span>
                            <span className="text-2xl text-[#26F46C]">*</span>
                        </Link>
                    </div>

                    {/* Back Link */}
                    <Link
                        href="/admin"
                        className="inline-flex items-center text-purple-600 mb-12 hover:underline"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to admin
                    </Link>

                    {/* Main Content */}
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold">
                            Choose a username
                        </h1>
                        <p className="text-gray-600">
                            Choose a Linktree URL for your new Linktree. You can always change it later.
                        </p>

                        {/* Username Input */}
                        <div className="mt-8">
                            <Input
                                label=""
                                placeholder="Username"
                                labelPlacement="outside"
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">linktr.ee/</span>
                                    </div>
                                }
                                className="max-w-md"
                            />
                        </div>

                        {/* Continue Button */}
                        <Button
                            className="w-full bg-[#EBEADD] text-gray-400 mt-4"
                            size="lg"
                            radius="full"
                        >
                            Continue
                        </Button>
                    </div>
                </div>

                {/* Cookie Preferences */}
                <div className="absolute bottom-6 left-6">
                    <Button
                        variant="light"
                        className="text-gray-500 text-sm"
                    >
                        Cookie preferences
                    </Button>
                </div>
            </div>

            {/* Right Column - Image */}
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

