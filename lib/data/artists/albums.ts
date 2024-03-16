import { LinkCollectionCardProps } from "@/components/link-collection-card";
import { URL, selectedImageIndex } from "@/lib/constants";
import { ArtistAlbumsSchema } from "@/lib/definitions/artists/albums";

async function getArtistAlbums(id: string, page: number) {
    const response: ArtistAlbumsSchema = await fetch(
        `${URL}/api/artists/${id}/albums?page=${page}`,
    ).then((body) => body.json());
    return response;
}

export async function fetchArtistAlbums({
    id,
    page,
}: {
    id: string;
    page: number;
}) {
    const response = await getArtistAlbums(id, page);
    const checkIfItsLastPage = await getArtistAlbums(id, page + 1).then(
        (data) => data.data.albums.length === 0,
    );

    const data: { collections: LinkCollectionCardProps } & {
        lastPage: boolean;
    } = {
        collections: response.data.albums.map((album) => ({
            id: album.id,
            name: album.name,
            src: album.image.slice(selectedImageIndex)[0].url,
            type: album.type,
        })),
        lastPage: checkIfItsLastPage,
    };

    return data;
}
