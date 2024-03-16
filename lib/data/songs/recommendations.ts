import {
    LIMIT_RECOMMENDATION_SONGS,
    URL,
    selectedAudioIndex,
} from "@/lib/constants";

import { SongsRecommendationsSchema } from "@/lib/definitions/songs/recommendations";
import { SongSchema } from "@/lib/definitions/songs/songs";

async function getSongsRecommendations(songID: string) {
    const response = await fetch(
        `${URL}/api/songs/${songID}/suggestions?limit=${LIMIT_RECOMMENDATION_SONGS}`,
    );
    if (response.status === 200) {
        const data: SongsRecommendationsSchema = await response.json();
        return data;
    }
    return null;
}

export function parseRecommendationResponse(
    response: SongsRecommendationsSchema,
    songsToExcluded: string[],
) {
    const songs: SongSchema[] = response.data.map((data) => ({
        album: data.album.name,
        artist: data.artists.all.map((artist) => artist.name).join(","),
        artwork: data.image.map((image) => ({
            src: image.url,
            sizes: image.quality as string,
        })),
        duration: data.duration.toString(),
        id: {
            album: data.album.id,
            artists: data.artists.all.map((artist) => artist.id),
            song: data.id,
        },
        name: data.name,
        url: data.downloadUrl.slice(selectedAudioIndex)[0].url,
    }));

    const filteredSongs = songs.filter((value) => {
        if (songsToExcluded.includes(value.id.song)) return;
        else return value;
    });
    return filteredSongs;
}
