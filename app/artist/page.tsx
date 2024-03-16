import { CollectionSongs } from "@/components/collection-songs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchArtistSongs } from "@/lib/data/artists/songs";
import { fetchArtistInformation } from "@/lib/data/artists/info";
import { DisplayArtistInformation } from "./artist-info";
import { PaginationResults } from "./pagination";
import { fetchArtistAlbums } from "@/lib/data/artists/albums";
import { LinkCollectionCard } from "../../components/link-collection-card";
import { CollectionCard } from "@/components/collection-card";
import { Separator } from "@/components/ui/separator";
import { H1 } from "@/components/ui/h1";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        id?: string;
        songs_page?: string;
        albums_page?: string;
    };
}) {
    if (!searchParams || !searchParams.id) return;

    const songsPage = Number(searchParams?.songs_page) || 0;
    const songsCollection = await fetchArtistSongs({
        artistId: searchParams.id,
        pageCount: songsPage,
    });

    const albumsPage = Number(searchParams?.albums_page) || 0;
    const albumsCollection = await fetchArtistAlbums({
        id: searchParams.id,
        page: albumsPage,
    });

    const artistInfo = await fetchArtistInformation(searchParams.id);

    return (
        <ScrollArea className="h-screen pb-28">
            <div className="h-[52px]" />
            <Separator />

            <div className="mx-2 mt-5">
                <CollectionCard
                    collection={{
                        img: artistInfo.artist.src,
                        name: artistInfo.artist.name,
                    }}
                />
                <CollectionSongs collection={songsCollection.collection} />

                <PaginationResults
                    path="/search/artist"
                    isLastPage={songsCollection.lastPage}
                    paramsVariable="songs_page"
                />

                <Separator className="my-12" />

                <H1>{`Top Albums of ${artistInfo.artist.name}`}</H1>
                <LinkCollectionCard
                    collections={albumsCollection.collections}
                />
                <PaginationResults
                    path="/search/artist"
                    isLastPage={albumsCollection.lastPage}
                    paramsVariable="albums_page"
                />
            </div>
        </ScrollArea>
    );

    /*
    return (
        <ScrollArea className="h-screen pb-28">
            <DisplayArtistInformation artist={artistInfo.artist}>
                <CollectionSongs collection={songsCollection.collection} />

                <PaginationResults
                    path="/search/artist"
                    isLastPage={songsCollection.lastPage}
                    paramsVariable="songs_page"
                />
                <LinkCollectionCard
                    collections={albumsCollection.collections}
                />
                <PaginationResults
                    path="/search/artist"
                    isLastPage={albumsCollection.lastPage}
                    paramsVariable="albums_page"
                />
            </DisplayArtistInformation>
        </ScrollArea>
    );
    */
}
