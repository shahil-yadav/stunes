"use client";
import React, { useState } from "react";

import { Nav } from "./nav";
import { AudioWaveform, LibraryIcon, Play, Search } from "lucide-react";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "./ui/resizable";
import { P } from "./ui/p";
import { Separator } from "./ui/separator";
import { TooltipProvider } from "./ui/tooltip";

import { cn } from "@/lib/utils";

import { MusicPlayer } from "./music-player/music_player";
import { Audio } from "./music-player/audio";
import { ModeToggle } from "./ui/dark-mode";
import { Recommendations } from "./music-player/recommendations";

export function Layout({ children }: { children: React.ReactNode }) {
    const navCollapsedSize = 4;
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                className="rounded-lg border dark:border-zinc-800"
            >
                <ResizablePanel
                    defaultSize={4}
                    maxSize={25}
                    minSize={20}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    onCollapse={() => {
                        setIsCollapsed(() => true);
                    }}
                    onExpand={() => {
                        setIsCollapsed(() => false);
                    }}
                    className="h-screen min-w-[50px] transition-all duration-300 ease-in-out"
                >
                    <div className="h-full">
                        <div
                            className={cn(
                                "flex h-[52px] items-center justify-center",
                                { "px-2": isCollapsed === false },
                            )}
                        >
                            {isCollapsed === false ? <P>stunes</P> : <Play />}
                        </div>
                        <Separator />

                        <Nav
                            isCollapsed={isCollapsed}
                            links={[
                                {
                                    title: "Home",
                                    href: "/home",
                                    icon: AudioWaveform,
                                    variant: "default",
                                },
                                {
                                    title: "Search",
                                    href: "/search",
                                    icon: Search,
                                    variant: "ghost",
                                },
                            ]}
                        />

                        <Separator />
                        <Nav
                            isCollapsed={isCollapsed}
                            links={[
                                {
                                    title: "Library",
                                    href: "/library",
                                    icon: LibraryIcon,
                                    variant: "ghost",
                                },
                            ]}
                        />
                        <ModeToggle />
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={96}>
                    <ResizablePanelGroup
                        className="dark:border-zinc-700"
                        direction="vertical"
                    >
                        <ResizablePanel defaultSize={85}>
                            {children}
                        </ResizablePanel>

                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={15}>
                            <DisplayMusic />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    );
}

function DisplayMusic() {
    return (
        <div className="mt-4">
            <MusicPlayer />
            <Audio />
        </div>
    );
}
