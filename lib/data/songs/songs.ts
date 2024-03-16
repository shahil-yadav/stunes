import { SongSchema, SongsResponseSchema } from "../../definitions/songs/songs";
import { URL, selectedAudioIndex, selectedImageIndex } from "../../constants";

export async function fetchSongs(id: string) {
    const url = `${URL}/api/songs/${id}`;
    try {
        const body = await fetch(url);

        const data: SongsResponseSchema = await body.json();

        if (body.status === 200) {
            const songs = data.data;
            const { name, image } = songs[0];
            const parsedSongs: SongSchema[] = songs.map((song) => ({
                name: song.name,
                id: {
                    song: song.id,
                    artists: song.artists.all.map((artist) => artist.id),
                    album: song.album.id,
                },
                artist: song.artists.primary
                    .map((artist) => artist.name)
                    .join(","),
                album: song.album.name,
                artwork: song.image.map((src_sizes) => ({
                    src: src_sizes.url,
                    sizes: src_sizes.quality,
                })),
                duration: song.duration.toString(),
                url: song.downloadUrl.slice(selectedAudioIndex)[0].url,
            }));

            return {
                name,
                img: image.slice(selectedImageIndex)[0].url,
                songs: parsedSongs,
            };
        } else {
            throw new Error("Status Code is either 400 | 404");
        }
    } catch (err) {
        console.error(err);
        throw new Error("Song fetching failed");
    }
}
