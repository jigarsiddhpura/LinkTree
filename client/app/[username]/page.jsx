import { notFound } from "next/navigation"
import { Avatar } from "@nextui-org/avatar"
import { Button } from "@nextui-org/button"
import { Pencil } from 'lucide-react'
import { ProfileLinkCard } from "@/components/profile/profile-link-card"


async function getProfile(username){
    try {
        const res = await fetch(`https://api.inflow.chat/${username}`, {
            rejectUnauthorized: false, // This bypasses SSL verification
        })

        if (!res.ok) {
            throw new Error('Failed to fetch profile')
        }

        const links = await res.json()

        // Construct profile from links data
        return {
            username,
            bio: "anime boi", // This would come from API in real implementation
            links: links.sort((a, b) => a.position - b.position)
        }
    } catch (error) {
        console.error('Error fetching profile:', error)
        notFound()
    }
}

export default async function ProfilePage({params}) {
    const profile = await getProfile(params.username)

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
                    className="bg-white/10 text-white"
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
                    {profile.links.map((link) => (
                        link.isVisible && (
                            <ProfileLinkCard key={link.id} link={link} />
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

