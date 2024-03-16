import { CollectionSongsProps } from "@/components/collection-card";
import { URL, selectedAudioIndex } from "@/lib/constants";
import { ArtistSongsSchema } from "@/lib/definitions/artists/songs";

import { formatLabel } from "@/lib/utils";

async function getArtstSongs(pageCount: number, artistId: string) {
    const url = `${URL}/api/artists/${artistId}/songs?page=${pageCount}`;

    const response = await fetch(url);
    const data: ArtistSongsSchema = await response.json();
    return data;
}

export async function fetchArtistSongs({
    artistId,
    pageCount,
}: {
    artistId: string;
    pageCount: number;
}) {
    const response = await getArtstSongs(pageCount, artistId);

    const checkIfItsLastPage = !!(await getArtstSongs(
        pageCount + 1,
        artistId,
    ).then((data) => data?.data.songs.length === 0));

    const songsCollection: CollectionSongsProps & { lastPage: boolean } = {
        lastPage: checkIfItsLastPage,
        collection: {
            name: "Top Songs",
            songs: response.data.songs.map((song) => ({
                album: song.album.name,
                artist: song.artists.primary
                    .map((artist) => artist.name)
                    .join(","),
                name: formatLabel(song.name),
                artwork: song.image.map((src_sizes) => ({
                    src: src_sizes.url,
                    sizes: src_sizes.quality,
                })),
                duration: song.duration.toString(),
                id: {
                    album: song.album.id,
                    artists: song.artists.all.map((artist) => artist.id),
                    song: song.id,
                },
                url: song.downloadUrl.slice(selectedAudioIndex)[0].url,
            })),
        },
    };
    return songsCollection;
}
