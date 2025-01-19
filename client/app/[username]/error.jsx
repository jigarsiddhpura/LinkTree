"use client"

import { useEffect } from "react"
import { Button } from "@nextui-org/button"
import Link from "next/link"

export default function Error({
    error,
    reset,
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-200 to-purple-200">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold mb-2">Page not found</h1>
                <p className="text-gray-600 mb-8">
                    This Linktree doesn&apos;t exist. Try creating it!
                </p>
                <div className="space-x-4">
                    <Button
                        as={Link}
                        href="/"
                        variant="flat"
                        color="primary"
                    >
                        Go Home
                    </Button>
                    <Button
                        variant="bordered"
                        onPress={() => reset()}
                    >
                        Try again
                    </Button>
                </div>
            </div>
        </div>
    )
}

