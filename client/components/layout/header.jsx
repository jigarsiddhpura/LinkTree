"use client"

import { Button } from "@nextui-org/button"
import { Share2, Copy } from 'lucide-react'

export function Header({username}) {
    return (
        <div className="w-full bg-[#dfe8f9] rounded-xl p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Your Linktree is live: </span>
                <a href={`https://inflow.chat/${username}`} className="text-blue-500 hover:underline">
                    {`inflow.chat/${username}`}
                </a>
            </div>
            <Button
                variant="flat"
                startContent={<Copy className="w-4 h-4" />}
                className="rounded-3xl bg-white"
            >
                Copy your Linktree URL
            </Button>

        </div>
    )
}

