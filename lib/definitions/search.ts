export interface SearchResponseSchema {
    data: Data;
    success: boolean;
}

interface Data {
    albums: Albums;
    artists: Artists;
    playlists: Artists;
    songs: Albums;
    topQuery: Artists;
}

interface Albums {
    position: number;
    results: AlbumsResult[];
}

interface AlbumsResult {
    description: string;
    id: string;
    image: Image[];
    language: string;
    primaryArtists?: string;
    singers?: string;
    songIds?: string;
    title: string;
    type: string;
    year?: string;
}

interface Image {
    quality: Quality;
    url: string;
}

enum Quality {
    The150X150 = "150x150",
    The500X500 = "500x500",
    The50X50 = "50x50",
}

interface Artists {
    position: number;
    results: ArtistsResult[];
}

export interface ArtistsResult {
    description: string;
    id: string;
    image: Image[];
    position?: number;
    title: string;
    type: string;
}
