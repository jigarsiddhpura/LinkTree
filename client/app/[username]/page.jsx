import { notFound } from "next/navigation"
import { Avatar } from "@nextui-org/avatar"
import { Button } from "@nextui-org/button"
import { Pencil } from 'lucide-react'
import { cache } from 'react'
import { ProfileLinkCard } from "@/components/profile/profile-link-card"
import Error from "./error"

// export const dynamicParams = true;

// Cache the data fetching to optimize build performance
// const getProfile = async (username) => {
//     try {
//         const response = await fetch(`https://api.inflow.chat/api/${username}`, {
//             // next: { revalidate: 3600 } // Cache for 1 hour
//         })

//         if (!response.ok) return null
//         return response.json()
//     } catch (error) {
//         console.error(`Error fetching user ${username}:`, error)
//         return null
//     }
// }

// Implement generateStaticParams with error boundary
export async function generateStaticParams() {
    try {
        const response = await fetch('https://api.inflow.chat/api/profilenames')
        const usernames = await response.json()

        return usernames.map((user) => ({
            username: user.username,
        }))
    } catch (error) {
        // Provide fallback for build process
        console.error('Error generating params:', error)
        return [{ username: 'default' }]
    }
}

// Implement middleware to handle routing
// export async function middleware(params) {
//     const user = await getUser(params.username)
//     if (!user) {
//         // notFound()
//         <Error/>
//     }
// }


export default async function ProfilePage({ params }) {
    const { username } = await params;

    // const profile = await getProfile(username)
    const profile = { "links": [{ "id": "ca4ba4ca-6f76-402d-83aa-c2674d2260c9", "profileId": "86a4a0e7-26d3-4208-8030-f348ae65e7a4", "title": "Twitter", "url": "https://x.com/laughingzoro", "position": 1, "isVisible": true, "thumbnail": null }, { "id": "9d7e082b-fd3c-4361-9ceb-b9e06bd2bf8b", "profileId": "86a4a0e7-26d3-4208-8030-f348ae65e7a4", "title": "Link", "url": "https://www.linkedin.com/in/jigar-siddhpura/", "position": 2, "isVisible": true, "thumbnail": null }], "id": "86a4a0e7-26d3-4208-8030-f348ae65e7a4", "username": "jigar", "title": "luffy", "bio": "Pirate king", "templateColor": null, "profileImage": "/blue-profile.webp" }
    if (!profile) return Error();

    // (A) Server-side increment page views
    // await fetch(`https://api.inflow.chat/api/analytics/profile/${profile.id}/view`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     cache: "no-store" // Disable caching
    // });


    const links = await profile?.links;
    if (!links) return notFound();

    return (
        <div className="min-h-screen relative bg-gradient-to-br from-blue-200 to-purple-200">
            {/* Header */}
            <header className="flex justify-between items-center p-4">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold text-white">
                        This is your Linktree.
                    </span>
                </div>
                <Button
                    as="a"
                    href="/admin"
                    variant="flat"
                    className="bg-white text-blue-500 font-medium px-6"
                >
                    Edit
                </Button>
            </header>

            {/* Main Content */}
            <main className="max-w-lg mx-auto px-4 py-12">
                <div className="flex flex-col items-center mb-8">
                    <Avatar
                        src={profile.profileImage}
                        name={profile.username[0].toUpperCase()}
                        className="w-24 h-24 text-large mb-4 bg-blue-600"
                    />
                    <h1 className="text-2xl font-bold text-white mb-1">
                        {profile.username}
                    </h1>
                    {profile.bio && (
                        <p className="text-white/80 mb-6">{profile.bio}</p>
                    )}
                </div>

                {/* Links */}
                <div className="space-y-3">
                    {links.map((link) => (
                        link.isVisible && (
                            <ProfileLinkCard key={link.id} link={link} linkId={link.id} profileId={profile.id} />
                        )
                    ))}
                </div>

                {/* Join Button */}
                <div className="mt-8 text-center">
                    <Button
                        className="bg-white font-medium px-6"
                        startContent={
                            <span className="text-xl">*</span>
                        }
                    >
                        Join {profile.username} on Linktree
                    </Button>
                </div>
            </main>
        </div>
    )
}

