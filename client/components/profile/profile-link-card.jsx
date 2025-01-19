"use client"

import { Card, CardBody } from "@nextui-org/card"
import { Button } from "@nextui-org/button"
import { MoreHorizontal } from 'lucide-react'

// interface ProfileLinkCardProps {
//     link: ProfileLink
// }

export function ProfileLinkCard({ link }) {
    return (
        <Card className="w-full bg-white/90 backdrop-blur-sm">
            <CardBody className="p-0">
                <Button
                    as="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full px-6 py-4 justify-between"
                    variant="light"
                >
                    <span className="text-base font-medium">{link.title}</span>
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </Button>
            </CardBody>
        </Card>
    )
}

