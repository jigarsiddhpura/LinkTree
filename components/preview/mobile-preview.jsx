"use client"

import { useEffect, useRef } from "react"
// import { Link } from "@/types/link"

// interface MobilePreviewProps {
//     links: Link[]
// }

export function MobilePreview({ links }) {
    const iframeRef = useRef(null)

    useEffect(() => {
        // In a real implementation, we would generate the preview HTML
        // and update the iframe content
        if (iframeRef.current) {
            const activeLinks = links.filter(link => link.isActive)
            // Update iframe content
        }
    }, [links])

    return (
        <div className="relative w-[400px] h-[800px]">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 to-green-100 rounded-[40px]" />
            <div className="absolute inset-[12px] bg-white rounded-[32px] overflow-hidden">
                <iframe
                    ref={iframeRef}
                    className="w-full h-full"
                    title="Mobile Preview"
                />
            </div>
        </div>
    )
}

