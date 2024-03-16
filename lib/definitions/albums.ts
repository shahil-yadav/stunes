export interface AlbumResponseSchema {
    data: Data;
    success: boolean;
}

interface Data {
    artists: Artists;
    explicitContent: boolean;
    id: string;
    image: Image[];
    language: string;
    name: string;
    playCount: number;
    songCount: number;
    songs: Song[];
    type: string;
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
    image: Image[];
    name: string;
    role: Role;
    type: Type;
    url: string;
}

interface Image {
    quality: Quality;
    url: string;
}

enum Quality {
    The12Kbps = "12kbps",
    The150X150 = "150x150",
    The160Kbps = "160kbps",
    The320Kbps = "320kbps",
    The48Kbps = "48kbps",
    The500X500 = "500x500",
    The50X50 = "50x50",
    The96Kbps = "96kbps",
}

enum Role {
    Empty = "",
    Lyricist = "lyricist",
    Music = "music",
    PrimaryArtists = "primary_artists",
    Singer = "singer",
    Starring = "starring",
}

enum Type {
    Artist = "artist",
}

interface Song {
    album: Album;
    artists: Artists;
    copyright: string;
    downloadUrl: Image[];
    duration: number;
    explicitContent: boolean;
    hasLyrics: boolean;
    id: string;
    image: Image[];
    label: string;
    language: string;
    lyricsId: string;
    name: string;
    playCount: number;
    releaseDate: Date;
    type: string;
    url: string;
    year: number;
}

interface Album {
    id: string;
    name: string;
    url: string;
}
