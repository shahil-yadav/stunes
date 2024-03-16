import { URL, selectedImageIndex } from "../../constants";
import { HomepageResponseSchema } from "../../definitions/homepage";
import { language } from "../../constants";

export type HomepageDataSchema = {
    id: string;
    name: string;
    image: string;
    type: string;
};

type HomepageCollectionSchema = {
    [key: string]: HomepageDataSchema[];
};

export async function fetchHomepage() {
    const collection: HomepageCollectionSchema = {};

    function pushEntryInCollection(entry: string, data: HomepageDataSchema) {
        if (collection[entry] === undefined) {
            collection[entry] = [];
        }
        collection[entry].push(data);
    }

    try {
        const url = `${URL}/modules?language=${language}`;

        const response = await fetch(url).then((data) => data.json());

        const data = response as unknown as HomepageResponseSchema;

        // Tapping into the albums section
        data.data.albums.forEach((album) => {
            const { id, name, image, type } = album;
            const field = `${type}s`;
            pushEntryInCollection(field, {
                id,
                name,
                image: album.image.slice(selectedImageIndex)[0].link,
                type,
            });
        });

        // Tapping into the charts section
        data.data.charts.forEach((chart) => {
            const { id, title: name, image, type } = chart;
            const field = `${type}s`;
            pushEntryInCollection(field, {
                id,
                name,
                image: chart.image.slice(selectedImageIndex)[0].link,
                type,
            });
        });

        // Tapping into the albums section
        data.data.playlists.forEach((playlist) => {
            const { id, title, image, type } = playlist;
            const field = `${type}s`;
            pushEntryInCollection(field, {
                id,
                name: title,
                image: playlist.image.slice(selectedImageIndex)[0].link,
                type,
            });
        });

        // Tapping into the trending section:
        // 1).Song Field
        data.data.trending.songs.forEach((song) => {
            const { id, name, image, type } = song;
            const field = `${type}s`;
            pushEntryInCollection(field, {
                id,
                name,
                image: image.slice(selectedImageIndex)[0].link,
                type,
            });
        });
        // 2).Albums Sections
        data.data.trending.albums.forEach((album) => {
            const { id, name, image, type } = album;
            const field = `${type}s`;
            pushEntryInCollection(field, {
                id,
                name,
                image: image.slice(selectedImageIndex)[0].link,
                type,
            });
        });
    } catch (error) {
        console.error(error);
    }
    return collection;
}
