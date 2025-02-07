"use client"

import { Card, CardBody } from "@nextui-org/card"
import { Button } from "@nextui-org/button"
import { MoreHorizontal } from 'lucide-react'

// interface ProfileLinkCardProps {
//     link: ProfileLink
// }

export function ProfileLinkCard({ link, linkId, profileId }) {
    const handleClick = async () => {
        try {
            // 1) Fire analytics
            await fetch(`https://linktree-backend-hky4.onrender.com/api/analytics/profile/${profileId}/link/${linkId}/click`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            // alert("Clicked link: " + link.title);
        } catch (error) {
            console.error("Error updating link click:", error);
        }

        window.open(link.url, "_blank"); // or just do a normal <a> link
    };
    return (
        <Card className="w-full bg-white/90 backdrop-blur-sm">
            <CardBody className="p-0">
                <Button
                    as="a"
                    // href={link.url}
                    // target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full px-6 py-4 justify-between"
                    variant="light"
                    onPress={handleClick}
                >
                    <span className="text-base font-medium">{link.title}</span>
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </Button>
            </CardBody>
        </Card>
    )
}

