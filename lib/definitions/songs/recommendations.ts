export interface SongsRecommendationsSchema {
    data: Datum[];
    success: boolean;
}

interface Datum {
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
    name: string;
    playCount: number;
    releaseDate: Date;
    type: DatumType;
    url: string;
    year: number;
}

interface Album {
    id: string;
    name: string;
    url: string;
}

interface Artists {
    all: All[];
    featured: All[];
    primary: All[];
}

interface All {
    id: string;
    image: DownloadURL[];
    name: string;
    role: Role;
    type: AllType;
    url: string;
}

interface DownloadURL {
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
    FeaturedArtists = "featured_artists",
    Lyricist = "lyricist",
    Music = "music",
    PrimaryArtists = "primary_artists",
    Singer = "singer",
}

enum AllType {
    Artist = "artist",
}

enum Language {
    English = "english",
}

enum DatumType {
    Song = "song",
}
