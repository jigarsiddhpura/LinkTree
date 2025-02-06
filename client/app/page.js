"use client";

import { Button, Input } from "@nextui-org/react";
import NavBar from "@/components/NavBar";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  return (
    <div className="min-h-screen bg-[#2B4720]">
      <NavBar />
      <main className="container mx-auto px-4">
        <div className="grid justify-center">
          <div className="text-white max-w-6xl text-center">
            <h1 className="text-[#C2F970] text-5xl md:text-7xl font-extrabold leading-tight mb-8">
              Everything you are.
              <br />
              In one, simple link in
              <br />
              bio.
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/80">
              Join 50M+ people using Linktree for their link in bio. One link to help you share
              everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube
              and other social media profiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative w-full max-w-sm ">
                <Input
                  size="lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  classNames={{
                    input: "pl-24",
                    base: "max-w-sm",
                  }}
                  className="py-4"
                  placeholder="yourname"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-gray-500">Linktree/</span>
                    </div>
                  }
                />
              </div>
              <Button size="md" className="bg-[#E9C0E9] text-[#4C2E05] hover:bg-[#E9C0E9]/90 py-6 rounded-full">
                Claim your Linktree
              </Button>
            </div>
          </div>
          {/* <div className="relative lg:h-[800px] flex items-center justify-center">
            <div className="transform rotate-6">
              <PersonaCard />
            </div>
          </div> */}
        </div>
      </main>
    </div>
  )
}

