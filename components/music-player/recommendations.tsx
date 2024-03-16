"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useGetRecommendationsQuery } from "@/lib/redux/features/collectionSlice";
import { Loader2Icon, FileWarningIcon } from "lucide-react";
import { useEffect } from "react";
import { addRecommendationInThePlaylist } from "@/lib/redux/features/controlsSlice";
import { parseRecommendationResponse } from "@/lib/data/songs/recommendations";

import { useToast } from "../ui/use-toast";
import { toast } from "sonner";


function Recommendations() {
    const playlist = useAppSelector(
        (state) => state["player-controls"].playlist,
    );
    const toast = useToast()

    const activeSongIndex = playlist.activeSongIndex;
    const activeSongID = playlist.songs[activeSongIndex].id.song;
    const totalSongs = playlist.songs.length;

    if (activeSongIndex !== totalSongs - 1) return null;

    return <RecommendationsFetch activeSongID={activeSongID} />;
}

function RecommendationsFetch({ activeSongID }: { activeSongID: string }) {
    const history = useAppSelector((state) => state["player-controls"].history);

    const songsToExclude = history.map((val) => val.song.id.song);

    const { data, isSuccess, isError } =
        useGetRecommendationsQuery(activeSongID);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isSuccess === true && data !== undefined) {
            const songs = parseRecommendationResponse(data, songsToExclude);

            dispatch(addRecommendationInThePlaylist(songs));
        }
    }, [isSuccess]);

    useEffect(()=>{
        if(isError === false) return 
        toast.error("Recommendations err! Ooops", {
            description: "Failed to get the recommendation",
          })
    }, [isError])

    return <></>
}

export { Recommendations };
