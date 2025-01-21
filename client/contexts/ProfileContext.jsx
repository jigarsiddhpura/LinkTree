"use client"

// contexts/ProfileContext.jsx
import { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export function useProfile() {
    return useContext(ProfileContext);
}

export function ProfileProvider({ children }) {
    const [currentProfile, setCurrentProfile] = useState(null);

    return (
        <ProfileContext.Provider value={{ currentProfile, setCurrentProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}