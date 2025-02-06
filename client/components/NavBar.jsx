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
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

export default function NavBar() {
    const router = useRouter();
    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16} />
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
                        <Button radius="sm" variant="ghost" className="bg-slate-100 py-6 px-2"
                        onClick={() => router.push("/auth/login")}
                        >
                            Log in
                        </Button>
                    </NavbarItem>

                    <NavbarItem>
                        <Button radius="sm" variant="solid" className="bg-black hover:bg-slate-800 text-white rounded-3xl px-4 py-6"
                        onClick={() => router.push("/auth/signup")}
                        >Sign up free</Button>
                    </NavbarItem>
                </NavbarContent>

            </Navbar>
        </div>
    );
}
