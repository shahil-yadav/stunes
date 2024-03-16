import { URL, selectedAudioIndex, selectedImageIndex } from "../../constants";

import { PlaylistDataSchema } from "../../definitions/playlists";
import { SongSchema } from "../../definitions/songs/songs";
import { customSplit, formatLabel } from "../../utils";

export async function fetchPlaylists(id: string) {
    const url = `${URL}/playlists?id=${id}`;

    try {
        const response = await fetch(url).then((data) => data.json());
        const data = response as unknown as PlaylistDataSchema;

        const { image, name, songs } = data.data;
        const parsedSongs: SongSchema[] = songs.map((song) => ({
            name: formatLabel(song.name),
            artist: song.primaryArtists,
            album: song.album.name,
            artwork: song.image.map((src_sizes) => ({
                src: src_sizes.link,
                sizes: src_sizes.quality,
            })),
            id: {
                song: song.id,
                artists: [
                    ...customSplit(song.primaryArtistsId, ","),
                    ...customSplit(song.featuredArtistsId, ","),
                ],
                album: song.album.id,
            },
            duration: song.duration,
            url: song.downloadUrl.slice(selectedAudioIndex)[0].link,
        }));

        const playlists = {
            name: formatLabel(name),
            img: image.slice(selectedImageIndex)[0].link,
            songs: parsedSongs,
        };

        return playlists;
    } catch (error) {
        console.error(error);
    }
}
