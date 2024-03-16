import { CollectionCard } from "@/components/collection-card";
import { CollectionSongs } from "@/components/collection-songs";
import { H1 } from "@/components/ui/h1";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { fetchAlbums } from "@/lib/data/albums";

export default async function Page({
    searchParams,
}: {
    searchParams?: { id?: string };
}) {
    if (!searchParams || !searchParams.id) return <H1>Albums Id is null</H1>;

    const collection = await fetchAlbums(searchParams.id);

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
