export interface PlaylistDataSchema {
    data: Data;
    message: null;
    status: string;
}

export interface Data {
    fanCount: string;
    firstname: string;
    followerCount: string;
    id: string;
    image: Image[];
    lastname: string;
    name: string;
    shares: string;
    songCount: string;
    songs: Song[];
    url: string;
    userId: string;
    username: string;
}

export interface Image {
    link: string;
    quality: string;
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

export interface Song {
    album: Album;
    copyright: string;
    downloadUrl: Image[];
    duration: string;
    explicitContent: number;
    featuredArtists: string;
    featuredArtistsId: string;
    hasLyrics: string;
    id: string;
    image: Image[];
    label: string;
    language: Language;
    name: string;
    playCount: string;
    primaryArtists: string;
    primaryArtistsId: string;
    releaseDate: Date;
    type: string;
    url: string;
    year: string;
}

export interface Album {
    id: string;
    name: string;
    url: string;
}

export enum Language {
    English = "english",
}
