"use client"

import { Button } from "@nextui-org/button"
import { ChevronRight, Archive } from 'lucide-react'

export function CollectionActions() {
    return (
        <div className="flex justify-between items-center mb-8">
            <Button
                variant="bordered"
                className="text-gray-700 rounded-3xl"
                startContent={<Archive className="w-4 h-4" />}
                >
                Add collection
            </Button>
            <Button
                variant="light"
                startContent={<Archive className="w-4 h-4" />}
                endContent={<ChevronRight className="w-4 h-4" />}
                className="text-gray-700"
            >
                View archive
            </Button>
        </div>
    )
}

