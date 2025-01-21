"use client"

import { ProfileProvider } from '@/contexts/ProfileContext';

export default function AdminLayout({ children }) {
    return (
        <ProfileProvider>
            <div className="min-h-screen">{children}</div>
        </ProfileProvider>
    );
}