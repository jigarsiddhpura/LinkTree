import {ProfileClient}  from './ProfileClient';

// Cache the data fetching to optimize build performance
export const getProfile = async (username) => {
    try {
        const response = await fetch(`https://api.inflow.chat/api/${username}`, {
            // next: { revalidate: 3600 } // Cache for 1 hour
        })

        if (!response.ok) return null
        return response.json()
    } catch (error) {
        console.error(`Error fetching user ${username}:`, error)
        return null
    }
}

export default async function ProfilePage({ params }) {
    const { username } = await params;
    const profile = await getProfile(username);

    return <ProfileClient initialProfile={profile} username={username}/>;
}