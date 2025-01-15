"use client";

import { useEffect, useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    NavbarMenu, NavbarMenuToggle, NavbarMenuItem
} from "@nextui-org/react";
import Image from "next/image";
// import { FaFire, FaProjectDiagram, FaPaperPlane, FaRobot, FaChartBar } from 'react-icons/fa';

export const ChevronDown = ({ fill, size, height, width, ...props }) => {
    return (
        <svg
            fill="none"
            height={size || height || 24}
            viewBox="0 0 24 24"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const Lock = ({ fill, size, height, width, ...props }) => {
    const color = fill;

    return (
        <svg
            height={size || height || 24}
            viewBox="0 0 24 24"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g transform="translate(3.5 2)">
                <path
                    d="M9.121,6.653V4.5A4.561,4.561,0,0,0,0,4.484V6.653"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth={1.5}
                    transform="translate(3.85 0.75)"
                />
                <path
                    d="M.5,0V2.221"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth={1.5}
                    transform="translate(7.91 12.156)"
                />
                <path
                    d="M7.66,0C1.915,0,0,1.568,0,6.271s1.915,6.272,7.66,6.272,7.661-1.568,7.661-6.272S13.4,0,7.66,0Z"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth={1.5}
                    transform="translate(0.75 6.824)"
                />
            </g>
        </svg>
    );
};

export const Activity = ({ fill, size, height, width, ...props }) => {
    return (
        <svg
            height={size || height || 24}
            viewBox="0 0 24 24"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g
                fill="none"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            >
                <path d="M6.918 14.854l2.993-3.889 3.414 2.68 2.929-3.78" />
                <path d="M19.668 2.35a1.922 1.922 0 11-1.922 1.922 1.921 1.921 0 011.922-1.922z" />
                <path d="M20.756 9.269a20.809 20.809 0 01.194 3.034c0 6.938-2.312 9.25-9.25 9.25s-9.25-2.312-9.25-9.25 2.313-9.25 9.25-9.25a20.931 20.931 0 012.983.187" />
            </g>
        </svg>
    );
};

export const Flash = ({ fill = "currentColor", size, height, width, ...props }) => {
    return (
        <svg
            fill="none"
            height={size || height}
            viewBox="0 0 24 24"
            width={size || width}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M6.09 13.28h3.09v7.2c0 1.68.91 2.02 2.02.76l7.57-8.6c.93-1.05.54-1.92-.87-1.92h-3.09v-7.2c0-1.68-.91-2.02-2.02-.76l-7.57 8.6c-.92 1.06-.53 1.92.87 1.92Z"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const Server = ({ fill = "currentColor", size, height, width, ...props }) => {
    return (
        <svg
            fill="none"
            height={size || height}
            viewBox="0 0 24 24"
            width={size || width}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M19.32 10H4.69c-1.48 0-2.68-1.21-2.68-2.68V4.69c0-1.48 1.21-2.68 2.68-2.68h14.63C20.8 2.01 22 3.22 22 4.69v2.63C22 8.79 20.79 10 19.32 10ZM19.32 22H4.69c-1.48 0-2.68-1.21-2.68-2.68v-2.63c0-1.48 1.21-2.68 2.68-2.68h14.63c1.48 0 2.68 1.21 2.68 2.68v2.63c0 1.47-1.21 2.68-2.68 2.68ZM6 5v2M10 5v2M6 17v2M10 17v2M14 6h4M14 18h4"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const TagUser = ({ fill = "currentColor", size, height, width, ...props }) => {
    return (
        <svg
            fill="none"
            height={size || height}
            viewBox="0 0 24 24"
            width={size || width}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M18 18.86h-.76c-.8 0-1.56.31-2.12.87l-1.71 1.69c-.78.77-2.05.77-2.83 0l-1.71-1.69c-.56-.56-1.33-.87-2.12-.87H6c-1.66 0-3-1.33-3-2.97V4.98c0-1.64 1.34-2.97 3-2.97h12c1.66 0 3 1.33 3 2.97v10.91c0 1.63-1.34 2.97-3 2.97Z"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M12 10a2.33 2.33 0 1 0 0-4.66A2.33 2.33 0 0 0 12 10ZM16 15.66c0-1.8-1.79-3.26-4-3.26s-4 1.46-4 3.26"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const Scale = ({ fill = "currentColor", size, height, width, ...props }) => {
    return (
        <svg
            fill="none"
            height={size || height}
            viewBox="0 0 24 24"
            width={size || width}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7ZM18 6 6 18"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M18 10V6h-4M6 14v4h4"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export default function NavBar() {
    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16} />,
        scale: <Scale className="text-warning" fill="currentColor" size={30} />,
        lock: <Lock className="text-success" fill="currentColor" size={30} />,
        activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
        flash: <Flash className="text-primary" fill="currentColor" size={30} />,
        server: <Server className="text-success" fill="currentColor" size={30} />,
        user: <TagUser className="text-danger" fill="currentColor" size={30} />,
    };

    const [isOpen, setIsOpen] = useState(false);

    const [openDropdownId, setOpenDropdownId] = useState(null); // Tracks which dropdown is open

    const handleOpenChange = (id, isOpen) => {
        setOpenDropdownId(isOpen ? id : null); // Open only the current dropdown
    };

    return (
        <div className="p-12">
            <Navbar className=" py-2 border-2 rounded-full w-[90%] ml-[5%] bg-white">
                <NavbarBrand className="relative lg:right-12 xl:right-24">
                    <Image src="/logo.png" alt="Logo" width="90" height="90" ></Image>
                </NavbarBrand>

                <NavbarContent className="flex gap-3 relative right-40" justify="center">

                    <NavbarItem className="relative right-4 hover:bg-slate-200 px-4 py-3 rounded-xl">
                        <Link color="foreground" href="#">
                            Templates
                        </Link>
                    </NavbarItem>

                    <NavbarItem className="hover:bg-slate-200 px-4 py-3 rounded-xl">
                        <Link color="foreground" href="#">
                            Marketplace
                        </Link>
                    </NavbarItem>

                    <div
                        key={4}
                        onMouseEnter={() => handleOpenChange(4, true)}
                        onMouseLeave={() => handleOpenChange(4, false)}
                        className="relative" // To ensure proper hover containment
                    >
                        <Dropdown
                            className=""
                            isOpen={openDropdownId === 4}
                            onOpenChange={(isOpen) => handleOpenChange(4, isOpen)}
                        >
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="p-4 bg-transparent hover:bg-slate-200"
                                    endContent={
                                        <span className={`transition-transform transform ${openDropdownId === 4 ? "rotate-180" : "rotate-0"}`}>
                                            {icons.chevron}
                                        </span>
                                    }
                                    radius="sm"
                                >
                                    Discover
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Action event example" className="">
                                <DropdownItem key="new" className="py-3 pr-4 mb-1">LinkTree for Instagram</DropdownItem>
                                <DropdownItem key="copy" className="py-3 pr-4 mb-1">LinkTree for Twitter</DropdownItem>
                                <DropdownItem key="copy2" className="py-3 pr-4 mb-1">LinkTree for LinkedIn</DropdownItem>
                                <DropdownItem key="copy3" className="py-3 pr-4 mb-1">LinkTree for Tiktok</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>


                    <NavbarItem className="hover:bg-slate-200 px-4 py-3 rounded-xl">
                        <Link color="foreground" href="#">
                            Pricing
                        </Link>
                    </NavbarItem>

                    <div
                        key={2}
                        onMouseEnter={() => handleOpenChange(2, true)}
                        onMouseLeave={() => handleOpenChange(2, false)}
                        className="relative" // To ensure proper hover containment
                    >
                        <Dropdown
                            className=""
                            isOpen={openDropdownId === 2}
                            onOpenChange={(isOpen) => handleOpenChange(2, isOpen)}
                        >
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="xl:p-4 bg-transparent hover:bg-slate-200"
                                    endContent={
                                        <span className={`transition-transform transform ${openDropdownId === 2 ? "rotate-180" : "rotate-0"}`}>
                                            {icons.chevron}
                                        </span>
                                    }
                                    radius="sm"
                                >
                                    Learn
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Action event example" className="">
                                <DropdownItem key="new" className="py-3 pr-4 mb-1">
                                    All Articles
                                </DropdownItem>
                                <DropdownItem key="copy" className="py-3 pr-4 mb-1">
                                    Creators
                                </DropdownItem>
                                <DropdownItem key="edit" className="py-3 pr-4 mb-1">
                                    Trends
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                </NavbarContent>

                <NavbarContent justify="end" className="relative left-20">
                    <NavbarItem>
                        <Button radius="sm" variant="ghost" className="bg-slate-100 py-6 px-2">
                            Log in
                        </Button>
                    </NavbarItem>

                    <NavbarItem>
                        <Button radius="sm" variant="solid" className="bg-black hover:bg-slate-800 text-white rounded-3xl px-4 py-6">Sign up free</Button>
                    </NavbarItem>
                </NavbarContent>

            </Navbar>
        </div>
    );
}
