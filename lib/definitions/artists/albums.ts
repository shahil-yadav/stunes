export interface ArtistAlbumsSchema {
    data: Data;
    success: boolean;
}

interface Data {
    albums: Album[];
    total: number;
}

interface Album {
    artists: Artists;
    explicitContent: boolean;
    id: string;
    image: Image[];
    language: Language;
    name: string;
    playCount: number;
    songCount: number;
    type: AlbumType;
    url: string;
    year: number;
}

interface Artists {
    all: All[];
    featured: any[];
    primary: All[];
}

interface All {
    id: string;
    image: any[];
    name: string;
    role: Role;
    type: AllType;
    url: string;
}

enum Role {
    Music = "music",
    PrimaryArtists = "primary_artists",
    Singers = "singers",
}

enum AllType {
    Artist = "artist",
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

enum Language {
    English = "english",
}

enum AlbumType {
    Album = "album",
}
