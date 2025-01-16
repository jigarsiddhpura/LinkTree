"use client"

import { Link } from "@nextui-org/link"
import { Listbox, ListboxItem } from "@nextui-org/listbox"
import { LinkIcon, ShoppingBag, Palette, Calendar, BarChart2, Settings } from 'lucide-react'
import Image from "next/image"

const menuItems = [
    { name: "Links", icon: LinkIcon, href: "/", isActive: true },
    { name: "Shop", icon: ShoppingBag, href: "/shop" },
    { name: "Appearance", icon: Palette, href: "/appearance" },
    { name: "Social Planner", icon: Calendar, href: "/planner" },
    { name: "Analytics", icon: BarChart2, href: "/analytics" },
    { name: "Settings", icon: Settings, href: "/settings" }
]

export function Sidebar() {
    return (
        <aside className="w-64 h-screen border-r border-gray-200 py-4 px-2">
            <div className="mb-4 px-4">
                <Image src="/logo.png" alt="Logo" width="120" height="120" ></Image>
            </div>
            <Listbox
                aria-label="Navigation menu"
                className="p-0 gap-0"
                itemClasses={{
                    base: "px-4 py-3 rounded-lg data-[hover=true]:bg-default-100",
                    title: "text-sm font-normal"
                }}
            >
                {menuItems.map((item) => (
                    <ListboxItem
                        key={item.name}
                        textValue={item.name}
                    >
                        <Link
                            href={item.href}
                            className={`w-full flex items-center gap-2 ${item.isActive ? "text-purple-600" : "text-gray-600"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${item.isActive ? "text-purple-600" : "text-gray-600"
                                }`} />
                            {item.name}
                        </Link>
                    </ListboxItem>
                ))}
            </Listbox>
            
        </aside>
    )
}

