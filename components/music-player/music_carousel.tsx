"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { selectedImageIndex } from "@/lib/constants";
import {
    changeActiveSongTrack,
    setIsPlaying,
} from "@/lib/redux/features/controlsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Link from "next/link";
import { Download } from "lucide-react";

export function MusicCarousel() {
    const dispatch = useAppDispatch();
    const [api, setApi] = useState<CarouselApi>();

    const activeSongStates = useAppSelector(
        (state) => state["player-controls"].activeSong,
    );
    const playlist = useAppSelector(
        (state) => state["player-controls"].playlist,
    );
    const songs = playlist.songs;

    function handlePlayPause() {
        if (playlist.activeSongIndex === -1) {
            dispatch(changeActiveSongTrack(0));
            return;
        }
        if (activeSongStates.isPlaying) {
            dispatch(setIsPlaying(false));
        } else {
            dispatch(setIsPlaying(true));
        }
    }

    useEffect(() => {
        if (!api) return;
        api.scrollTo(playlist.activeSongIndex);

        api.on("select", () => {
            dispatch(changeActiveSongTrack(api.selectedScrollSnap()));
        });
    }, [api, playlist.activeSongIndex, dispatch]);

    return (
        <Carousel setApi={setApi} className="w-3/4 max-w-xs">
            <CarouselContent>
                {songs.map((song, index) => (
                    <CarouselItem key={index}>
                        <div className="p-2">
                            <Card className="border-none bg-transparent">
                                <CardContent className="flex aspect-square flex-col items-center justify-center">
                                    <img
                                        className="hidden transition-all active:scale-95 md:block"
                                        onClick={handlePlayPause}
                                        src={
                                            song.artwork.slice(
                                                selectedImageIndex,
                                            )[0].src
                                        }
                                        alt={song.name}
                                        width={500}
                                        height={500}
                                    />
                                    <img
                                        className="transition-all active:scale-95 md:hidden"
                                        onClick={handlePlayPause}
                                        src={
                                            song.artwork.slice(
                                                selectedImageIndex,
                                            )[0].src
                                        }
                                        alt={song.name}
                                        width={250}
                                        height={250}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
                
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
