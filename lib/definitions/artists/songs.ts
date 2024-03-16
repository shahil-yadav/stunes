export interface ArtistSongsSchema {
    data: Data;
    success: boolean;
}

export interface Data {
    songs: Song[];
    total: number;
}

export interface Song {
    album: Album;
    artists: Artists;
    copyright: string;
    downloadUrl: DownloadURL[];
    duration: number;
    explicitContent: boolean;
    hasLyrics: boolean;
    id: string;
    image: DownloadURL[];
    label: string;
    language: Language;
    lyricsId?: string;
    name: string;
    playCount: number;
    releaseDate: null;
    type: SongType;
    url: string;
    year: number;
}

export interface Album {
    id: string;
    name: string;
    url: string;
}

export interface Artists {
    all: All[];
    featured: All[];
    primary: All[];
}

export interface All {
    id: string;
    image: DownloadURL[];
    name: string;
    role: Role;
    type: AllType;
    url: string;
}

export interface DownloadURL {
    quality: Quality;
    url: string;
}

export enum Quality {
    The12Kbps = "12kbps",
    The150X150 = "150x150",
    The160Kbps = "160kbps",
    The320Kbps = "320kbps",
    The48Kbps = "48kbps",
    The500X500 = "500x500",
    The50X50 = "50x50",
    The96Kbps = "96kbps",
}

export enum Role {
    FeaturedArtists = "featured_artists",
    Lyricist = "lyricist",
    Music = "music",
    PrimaryArtists = "primary_artists",
    Singer = "singer",
}

export enum AllType {
    Artist = "artist",
}

export enum Language {
    English = "english",
}

export enum SongType {
    Song = "song",
}
