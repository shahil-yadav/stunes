import { fetchSongs } from "@/lib/data/songs/songs";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollectionCard } from "@/components/collection-card";
import { CollectionSongs } from "@/components/collection-songs";

export default async function Page({
    searchParams,
}: {
    searchParams?: { id?: string; active?: string };
}) {
    if (!searchParams || !searchParams.id) return;

    const collection = await fetchSongs(searchParams.id);

    return (
        collection && (
            <ScrollArea className="h-screen pb-32">
                <div className="h-[52px]" />
                <Separator />
                <div className="m-5">
                    <CollectionCard
                        collection={{
                            img: collection.img,
                            name: collection.name,
                        }}
                    />
                    <CollectionSongs
                        collection={{
                            name: collection.name,
                            songs: collection.songs,
                        }}
                    />
                </div>
            </ScrollArea>
        )
    );
}
