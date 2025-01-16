"use client"

import { Card, CardBody, CardFooter } from "@nextui-org/card"
import { Button } from "@nextui-org/button"
import { Avatar } from "@nextui-org/avatar"

export function PromoCard() {
    return (
        <div className="flex items-center gap-2">
            <Avatar
                size="sm"
                name="laughingzoro"
                src="https://ugc.production.linktr.ee/bb3de458-6172-49a8-9e25-067bf171ba6b_untitled.webp?io=true&size=avatar"
            />
            <span className="text-sm">@laughingzoro</span>
        </div>
        // <Card className="max-w-sm">
        //     <CardBody className="gap-4">
        //         <div>
        //             <p className="text-lg font-semibold">Save 25% this New Year! 🎉</p>
        //             <p className="text-sm text-gray-600">
        //                 Level up your Linktree today and save 25% on a year of Linktree Pro.
        //             </p>
        //         </div>
        //         <p className="text-sm text-gray-500">
        //             Offer ends in 16 days.
        //         </p>
        //         <Button
        //             className="bg-purple-600 text-white w-full"
        //         >
        //             Try Pro now
        //         </Button>
        //     </CardBody>

        // </Card>
    )
}

