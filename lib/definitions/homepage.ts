export interface HomepageResponseSchema {
    data: Data;
    message: null;
    status: string;
}

export interface Data {
    albums: AlbumElement[];
    charts: Chart[];
    playlists: Playlist[];
    trending: Trending;
}

interface AlbumElement {
    album?: AlbumAlbum;
    artists?: Artist[];
    duration?: string;
    explicitContent: string;
    featuredArtists: any[];
    id: string;
    image: ImageElement[];
    label?: string;
    language: Language;
    name: string;
    playCount: string;
    primaryArtists: Artist[];
    releaseDate?: Date;
    songCount?: string;
    songs?: any[];
    type: AlbumType;
    url: string;
    year: string;
}

interface AlbumAlbum {
    id: string;
    name: string;
    url: string;
}

interface Artist {
    id: string;
    image: ImageElement[] | boolean;
    name: string;
    role: Role;
    type: ArtistType;
    url: string;
}

interface ImageElement {
    link: string;
    quality: Quality;
}

enum Quality {
    The150X150 = "150x150",
    The500X500 = "500x500",
    The50X50 = "50x50",
}

enum Role {
    Empty = "",
    Music = "music",
    Singer = "singer",
}

enum ArtistType {
    Artist = "artist",
}

enum Language {
    English = "english",
    Hindi = "hindi",
}

enum AlbumType {
    Album = "album",
    Song = "song",
}

interface Chart {
    explicitContent: string;
    firstname: Firstname;
    id: string;
    image: ImageElement[];
    language: Language;
    subtitle: Firstname;
    title: string;
    type: ChartType;
    url: string;
}

enum Firstname {
    JioSaavn = "JioSaavn",
}

enum ChartType {
    Playlist = "playlist",
}

interface Playlist {
    explicitContent: string;
    firstname: Firstname;
    followerCount: string;
    id: string;
    image: ImageElement[];
    lastUpdated: string;
    songCount: string;
    subtitle: string;
    title: string;
    type: ChartType;
    url: string;
    userId: UserID;
}

enum UserID {
    PhulkiUser = "phulki_user",
}

interface Trending {
    albums: AlbumElement[];
    songs: AlbumElement[];
}
