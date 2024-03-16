import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

import { type SongSchema } from "@/lib/definitions/songs/songs";
import { SECONDS_REQUIRED_TO_INSERT_IN_THE_HISTORY } from "@/lib/constants";

const playlist: {
    songs: SongSchema[];
    activeSongIndex: number;
} = {
    songs: [],
    activeSongIndex: -1,
};

export type History = {
    listenCount: number;
    song: SongSchema;
}[];
const history: History = [];

export const controlsSlice = createSlice({
    name: "player-controls",
    initialState: {
        playlist,
        activeSong: {
            isReady: false,
            isPlaying: false,
            isSeeking: false,
            volume: 0.5,
            progressIndicator: {
                bufferedDuration: 0,
                totalSongDuration: 0,
                seekProgress: 0,
            },
        },
        history,
    },
    reducers: {
        addRecommendationInThePlaylist: (
            state,
            action: PayloadAction<SongSchema[]>,
        ) => {
            state.playlist.songs.push(...action.payload);
        },

        addSongsInThePlaylist: (state, action: PayloadAction<SongSchema[]>) => {
            if (state.activeSong.isPlaying) state.activeSong.isPlaying = false;

            if (action.payload.length === 1) {
                // Searching
                const songFoundAt = state.playlist.songs.findIndex(
                    (song) => song.url === action.payload[0].url,
                );
                if (songFoundAt !== -1) {
                    state.playlist.activeSongIndex = songFoundAt;
                } else {
                    state.playlist.activeSongIndex =
                        state.playlist.songs.length;
                    state.playlist.songs.push(...action.payload);
                }
            } else {
                state.playlist.songs = [];
                state.playlist.activeSongIndex = 0;
                state.playlist.songs.push(...action.payload);
            }
            state.activeSong.isReady = false;
        },

        addSongInTheHistory: (state) => {
            /* Before moving on to the specified index perform the insertion of current songs in the history section */
            const activeSong =
                state.playlist.songs[state.playlist.activeSongIndex];
            const songID = activeSong.id.song;

            // Find whether songID exists in the HistoryStack
            const isExists = state.history.findIndex(
                (val) => val.song.id.song === songID,
            );

            if (isExists !== -1) {
                const prevListenCount = state.history[isExists].listenCount;

                state.history.splice(isExists, 1);

                state.history.unshift({
                    listenCount: prevListenCount + 1,
                    song: activeSong,
                });
            } else {
                state.history.unshift({
                    listenCount: 1,
                    song: activeSong,
                });
            }
        },

        addCustomSongInTheHistory: (state, action: PayloadAction<History>) => {
            const songIdPresentInTheHistory = state.history.map(
                (song) => song.song.id.song,
            );
            const songsToAdd = action.payload.filter((song) => {
                const ID = song.song.id.song;
                if (songIdPresentInTheHistory.find((id) => id === ID)) {
                    return;
                } else {
                    return song;
                }
            });
            state.history.push(...songsToAdd);
        },

        changeActiveSongTrack: (state, action: PayloadAction<number>) => {

            state.activeSong.progressIndicator = {
                bufferedDuration: 0,
                seekProgress: 0,
                totalSongDuration: 0,
            }

            state.activeSong.isPlaying = false;
            state.activeSong.isReady = false;
            state.playlist.activeSongIndex = action.payload;
        },

        setActiveSongIndex: (state, action: PayloadAction<number>) => {
            state.playlist.activeSongIndex = action.payload;
        },

        setIsReady: function (state, action: PayloadAction<boolean>) {
            state.activeSong.isReady = action.payload;
        },

        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.activeSong.isPlaying = action.payload;
        },

        setVolume: (state, action: PayloadAction<number>) => {
            /* Volume needs to be from 0 to 1 */
            if (action.payload < 0 || action.payload > 1)
                throw new Error(
                    "Volume needs to be from 0 to 1, Kindly check the args!",
                );
            state.activeSong.volume = action.payload;
        },

        setBufferedProgress: (state, action: PayloadAction<number>) => {
            state.activeSong.progressIndicator.bufferedDuration =
                action.payload;
        },

        setTotalSongDuration: (state, action: PayloadAction<number>) => {
            state.activeSong.progressIndicator.totalSongDuration =
                action.payload;
        },

        setSeekProgress: (state, action: PayloadAction<number>) => {
            state.activeSong.progressIndicator.seekProgress = action.payload;
        },

        setIsSeeking: (state, action: PayloadAction<boolean>) => {
            state.activeSong.isSeeking = action.payload;
        },

        setActiveSongPlayback: (
            state,
            action: PayloadAction<{
                flag: boolean;
                seek: number;
            }>,
        ) => {
            state.activeSong.isSeeking = action.payload.flag;
            state.activeSong.progressIndicator.seekProgress =
                action.payload.seek;
        },
    },
});

export const {
    addRecommendationInThePlaylist,
    addSongsInThePlaylist,
    addSongInTheHistory,
    addCustomSongInTheHistory,
    changeActiveSongTrack,

    setActiveSongIndex,

    setIsReady,
    setIsPlaying,
    setIsSeeking,
    setVolume,

    setSeekProgress,
    setActiveSongPlayback,
    setBufferedProgress,
    setTotalSongDuration,
} = controlsSlice.actions;
