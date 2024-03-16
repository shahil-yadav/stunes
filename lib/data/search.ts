import { URL, selectedImageIndex } from "../constants";
import { ArtistsResult, SearchResponseSchema } from "../definitions/search";

export async function fetchSearchResults(query: string) {
    const url = `${URL}/api/search?query=${query}`;

    try {
        const body = await fetch(url);

        if (body.status === 200) {
            const data = (await body.json()) as unknown as SearchResponseSchema;

            const parseResult = (result: ArtistsResult, title: string) => ({
                title,
                name: result.title,
                type: result.type,
                id: result.id,
                src: result.image.slice(selectedImageIndex)[0].url,
            });

            const search = {
                topQuery: data.data.topQuery.results.map((result) =>
                    parseResult(result, "Top Search Results"),
                ),
                songs: data.data.songs.results.map((result) =>
                    parseResult(result, "Songs"),
                ),
                playlists: data.data.playlists.results.map((result) =>
                    parseResult(result, "Playlists"),
                ),
                albums: data.data.albums.results.map((result) =>
                    parseResult(result, "Albums"),
                ),
                artists: data.data.artists.results.map((result) =>
                    parseResult(result, "Artists"),
                ),
            };
            return search;
        } else {
            throw new Error(`${body.status} -> Status Code Occured`);
        }
    } catch (error) {
        console.error(error);
    }
}
