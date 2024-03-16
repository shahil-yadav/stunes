import { URL, selectedAudioIndex, selectedImageIndex } from "../constants";
import { AlbumResponseSchema } from "../definitions/albums";
import { SongSchema } from "../definitions/songs/songs";
import { customSplit } from "../utils";

export async function fetchAlbums(id: string) {
    const url = `${URL}/api/albums?id=${id}`;

    try {
        const response = await fetch(url);

        if (response.status === 200) {
            const data: AlbumResponseSchema = await response.json();

            const { image, name, songs } = data.data;
            const parsedSongs: SongSchema[] = songs.map((song) => ({
                name: song.name,
                artist: song.artists.primary.map((artist) => artist).join(","),
                album: song.album.name,
                artwork: song.image.map((src_sizes) => ({
                    src: src_sizes.url,
                    sizes: src_sizes.quality,
                })),
                id: {
                    song: song.id,
                    artists: song.artists.all.map((artist) => artist.id),
                    album: song.album.id,
                },
                duration: song.duration.toString(),
                url: song.downloadUrl.slice(selectedAudioIndex)[0].url,
            }));

            const albums = {
                name,
                img: image.slice(selectedImageIndex)[0].url,
                songs: parsedSongs,
            };

            return albums;
        }
    } catch (error) {
        console.error(error);
    }
}
