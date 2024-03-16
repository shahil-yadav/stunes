export interface ArtistInformationSchema {
    data: Data;
    success: boolean;
}

interface Data {
    availableLanguages: string[];
    bio: any[];
    dob: string;
    dominantLanguage: Language;
    dominantType: string;
    fanCount: string;
    fb: string;
    followerCount: string;
    id: string;
    image: Image[];
    isRadioPresent: boolean;
    isVerified: boolean;
    name: string;
    similarArtists: any[];
    singles: Single[];
    topAlbums: TopAlbum[];
    topSongs: TopSong[];
    twitter: string;
    type: AllType;
    url: string;
    wiki: string;
}

enum Language {
    English = "english",
    Spanish = "spanish",
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

interface Single {
    album: SingleAlbum;
    artists: Artists;
    downloadUrl: any[];
    duration: null;
    explicitContent: boolean;
    hasLyrics: boolean;
    id: string;
    image: Image[];
    language: Language;
    name: string;
    playCount: number;
    type: SingleType;
    url: string;
    year: number;
}

interface SingleAlbum {}

interface Artists {
    all: All[];
    featured: All[];
    primary: All[];
}

interface All {
    id: string;
    image: Image[];
    name: string;
    role: Role;
    type: AllType;
    url: string;
}

enum Role {
    FeaturedArtists = "featured_artists",
    Lyricist = "lyricist",
    Music = "music",
    PrimaryArtists = "primary_artists",
    Singer = "singer",
    Singers = "singers",
}

enum AllType {
    Artist = "artist",
}

enum SingleType {
    Album = "album",
}

interface TopAlbum {
    artists: Artists;
    explicitContent: boolean;
    id: string;
    image: Image[];
    language: Language;
    name: string;
    playCount: number;
    songCount: number;
    type: SingleType;
    url: string;
    year: number;
}

interface TopSong {
    album: TopSongAlbum;
    artists: Artists;
    copyright: string;
    downloadUrl: Image[];
    duration: number;
    explicitContent: boolean;
    hasLyrics: boolean;
    id: string;
    image: Image[];
    label: string;
    language: Language;
    lyricsId?: string;
    name: string;
    playCount: number;
    releaseDate: null;
    type: TopSongType;
    url: string;
    year: number;
}

interface TopSongAlbum {
    id: string;
    name: string;
    url: string;
}

enum TopSongType {
    Song = "song",
}
