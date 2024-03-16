"use client";

import { ReactEventHandler, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
    addSongInTheHistory,
    changeActiveSongTrack,
    setActiveSongIndex,
    setBufferedProgress,
    setIsPlaying,
    setIsReady,
    setIsSeeking,
    setSeekProgress,
    setTotalSongDuration,
    setVolume,
} from "@/lib/redux/features/controlsSlice";
import { HistoryCache } from "./history";
import { Recommendations } from "./recommendations";

export function Audio() {
    const audio = useRef<HTMLAudioElement>(null);
    const dispatch = useAppDispatch();
    const { activeSongIndex, songs } = useAppSelector(
        (state) => state["player-controls"].playlist,
    );
    const { volume: activeVolume, ...activeSongStates } = useAppSelector(
        (state) => state["player-controls"].activeSong,
    );

    const activeSong = songs[activeSongIndex];
    const handleBufferProgress: ReactEventHandler<HTMLAudioElement> = (e) => {
        const audio = e.currentTarget;
        const dur = audio.duration;
        if (dur > 0) {
            for (let i = 0; i < audio.buffered.length; i++) {
                if (
                    audio.buffered.start(audio.buffered.length - 1 - i) <
                    audio.currentTime
                ) {
                    const bufferedLength = audio.buffered.end(
                        audio.buffered.length - 1 - i,
                    );

                    dispatch(setBufferedProgress(bufferedLength));
                    break;
                }
            }
        }
    };

    useEffect(() => {
        if (audio.current === null) return;
        if (activeSongStates.isPlaying) audio.current.pause();
        audio.current.load();

        if (activeSongStates.isReady) {
            audio.current.play();
        } else {
            audio.current.pause();
        }
    }, [activeSongStates.isReady, activeSongIndex]);

    useEffect(() => {
        if (activeSongIndex >= 0) {
            dispatch(addSongInTheHistory());
        }
    }, [activeSongIndex]);

    useEffect(() => {
        if (audio.current === null) return;
        if (activeSongStates.isPlaying) audio.current.play();
        else audio.current.pause();
    }, [activeSongStates.isPlaying]);

    useEffect(() => {
        if (audio.current === null) return;

        if (activeSongStates.isSeeking) {
            audio.current.currentTime =
                activeSongStates.progressIndicator.seekProgress;
            dispatch(setIsSeeking(false));
        }
    }, [activeSongStates.isSeeking]);

    return (
        <>
            <HistoryCache />
            {activeSong && (
                <>
                    <Notifications
                        audio={audio.current}
                        audioMetadata={{
                            album: activeSong.album,
                            artist: activeSong.artist,
                            artwork: activeSong.artwork.map((data) => ({
                                src: data.src,
                                sizes: data.sizes,
                            })),
                            title: activeSong.name,
                        }}
                    />
                    <Recommendations />
                    <audio
                        ref={audio}
                        preload="metadata"
                        onDurationChange={(e) => {
                            const duration = e.currentTarget.duration;
                            dispatch(setTotalSongDuration(duration));
                        }}
                        onPlaying={() => {
                            dispatch(setIsPlaying(true));
                        }}
                        onPause={() => {
                            dispatch(setIsPlaying(false));
                        }}
                        onEnded={() => {
                            if(activeSongIndex !== songs.length - 1)
                                dispatch(setActiveSongIndex(activeSongIndex + 1));
                        }}
                        onCanPlay={(e) => {
                            e.currentTarget.volume = activeVolume;
                            // setVolume(e.currentTarget.volume);
                            dispatch(setVolume(activeVolume));
                            dispatch(setIsReady(true));
                        }}
                        onTimeUpdate={(e) => {
                            e.currentTarget.volume = activeVolume;
                            dispatch(
                                setSeekProgress(e.currentTarget.currentTime),
                            );
                            handleBufferProgress(e);
                        }}
                        onProgress={handleBufferProgress}
                        onVolumeChange={(e) =>
                            dispatch(setVolume(e.currentTarget.volume))
                        }
                    >
                        <source type="audio/mp4" src={activeSong.url} />
                    </audio>
                </>
            )}
        </>
    );
}

function Notifications({
    audio,
    audioMetadata,
}: {
    audio: HTMLAudioElement | null;
    audioMetadata: {
        title: string;
        artist: string;
        album: string;
        artwork: {
            src: string;
            sizes: string;
        }[];
    };
}) {
    const dispatch = useAppDispatch();
    const {activeSongIndex, songs} = useAppSelector(
        (state) => state["player-controls"].playlist,
    );
    useEffect(() => {
        if (!audio) return;

        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: audioMetadata.title,
                artist: audioMetadata.artist,
                album: audioMetadata.album,
                artwork: audioMetadata.artwork.map((data) => ({
                    src: data.src,
                    sizes: data.sizes,
                })),
            });

            navigator.mediaSession.setActionHandler(
                "seekbackward",
                (details) => {
                    audio.currentTime =
                        audio.currentTime - (details.seekOffset || 10);
                },
            );
            navigator.mediaSession.setActionHandler(
                "seekforward",
                (details) => {
                    audio.currentTime =
                        audio.currentTime + (details.seekOffset || 10);
                },
            );

            navigator.mediaSession.setActionHandler("previoustrack", () => {
                if(activeSongIndex !== 0){
                    dispatch(changeActiveSongTrack(activeSongIndex - 1));
                }else{
                    dispatch(changeActiveSongTrack(0))
                }
            });

            navigator.mediaSession.setActionHandler("nexttrack", () => {
                if(activeSongIndex !== songs.length-1){
                    dispatch(changeActiveSongTrack(activeSongIndex + 1));
                }else{
                    dispatch(changeActiveSongTrack(0))
                }
            });
        }
    }, [audio, activeSongIndex]);

    return null;
}
