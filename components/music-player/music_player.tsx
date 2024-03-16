"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import { cn, formatLabel } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MusicCarousel } from "./music_carousel";
import { ProgressBar } from "./progress_bar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { selectedImageIndex } from "@/lib/constants";
import { H3 } from "../ui/h3";
import { H1 } from "../ui/h1";
import { P } from "../ui/p";
import { Loader2Icon, LucideDownload } from "lucide-react";
import Link from "next/link";


const slideInAnimationBg = "animate-slide-in";
export function MusicPlayer() {
    const state = useAppSelector((state) => state["player-controls"]);
    const activeSongStates = state.activeSong;
    const activeSongInfo = state.playlist;
    const activeSong = activeSongInfo.songs[activeSongInfo.activeSongIndex];
    const activeSongURL = activeSong?.url
    const progressPercentage =
        (activeSongStates.progressIndicator.seekProgress /
            activeSongStates.progressIndicator.totalSongDuration) *
        100;
    return (
        <Drawer>
            <DrawerTrigger className="w-full">
                {activeSong ? (
                    <div className="mx-5 flex items-center rounded-sm border px-1 py-4">
                        <Avatar
                            className={cn("mr-5", {
                                "animate-spin": activeSongStates.isPlaying,
                            })}
                        >
                            <AvatarImage
                                src={
                                    activeSong.artwork.slice(
                                        selectedImageIndex,
                                    )[0].src
                                }
                            />
                            <AvatarFallback>
                                <Loader2Icon />
                            </AvatarFallback>
                        </Avatar>

                        <div className="w-full">
                            <P className="mb-2 mr-5 text-left">
                                {formatLabel(activeSong.name)}
                            </P>
                            <Progress value={progressPercentage} />
                        </div>
                    </div>
                ) : (
                    <H3>Currently no music is playing</H3>
                )}
            </DrawerTrigger>
            <DrawerContent className="top-36 border-none">
                <div className="flex relative h-full w-full flex-col items-center justify-center gap-2 px-3 py-14 backdrop-blur-sm xs:px-7">
                    {activeSong ? (
                        <>
                            <div>
                            { 
                            activeSongURL && 
                                <a href={activeSongURL} download={activeSong.name}>
                                    <LucideDownload />
                                </a>
                            }
                            </div>
                            <MusicCarousel />
                            <ProgressBar />
                        </>
                    ) : (
                        <H1>{"Sorry, you haven't add any songs"}</H1>
                    )}
                </div>
                <div
                    className={cn(
                        "absolute inset-0 -z-10 bg-zinc-200 bg-no-repeat dark:bg-[url('/Wavees.jpg')] dark:grayscale",
                        activeSongStates.isPlaying && slideInAnimationBg,
                    )}
                />
            </DrawerContent>
        </Drawer>
    );
}
