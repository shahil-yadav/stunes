export type SongSchema = {
    name: string;
    id: {
        song: string;
        artists: string[];
        album: string;
    };
    artist: string;
    album: string;
    artwork: {
        src: string;
        sizes: string;
    }[];
    url: string;
    duration: string;
};

export interface SongsResponseSchema {
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
    language: string;
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

interface Artists {
    all: All[];
    featured: any[];
    primary: All[];
}

interface All {
    id: string;
    image: DownloadURL[];
    name: string;
    role: string;
    type: string;
    url: string;
}

interface DownloadURL {
    quality: string;
    url: string;
}
