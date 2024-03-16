"use client";
import { useAppSelector } from "@/lib/redux/hooks";

import { selectedImageIndex } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    LinkCollectionCard,
    LinkCollectionCardProps,
} from "../../components/link-collection-card";
import { Separator } from "@/components/ui/separator";

import { H1 } from "@/components/ui/h1";

const FAVOURITE_COUNT = 3;
export default function Page() {
    const historyStore = useAppSelector(
        (state) => state["player-controls"].history,
    );

    const normalCollection: LinkCollectionCardProps = historyStore
        // .filter((val) => val.listenCount < FAVOURITE_COUNT)
        .map((val) => ({
            name: val.song.name,
            id: val.song.id.song,
            src: val.song.artwork.slice(selectedImageIndex)[0].src,
            type: "song",
        }));

    return (
        <>
            <div className="h-[52px]" />
            <Separator className="mb-4" />
            <ScrollArea className="mx-2 xs:mx-10 h-screen pb-32">
                <H1 className="mb-5">Pick up where you left off</H1>
                <LinkCollectionCard collections={normalCollection} />
            </ScrollArea>
        </>
    );
}
