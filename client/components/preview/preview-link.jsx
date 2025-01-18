import { Card, CardBody } from "@nextui-org/card"
import Image from "next/image"


export function PreviewLink({ link }) {
    return (
        <Card className="w-full mb-3 bg-white/10 backdrop-blur-sm">
            <CardBody className="p-3">
                <div className="flex items-center gap-3">
                    {link.thumbnail && (
                        <div className="relative w-12 h-12 shrink-0">
                            <Image
                                src={link.thumbnail || "/placeholder.svg"}
                                alt={link.title}
                                fill
                                className="object-cover rounded-sm"
                            />
                        </div>
                    )}
                    <div className="min-w-0">
                        <h3 className="text-sm font-medium text-white truncate">
                            {link.title}
                        </h3>
                        <p className="text-xs text-white/70 truncate">
                            {new URL(link.url).hostname}
                        </p>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

