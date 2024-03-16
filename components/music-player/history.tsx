"use client";

import {
    History,
    addCustomSongInTheHistory,
} from "@/lib/redux/features/controlsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useEffect, useState } from "react";

export function HistoryCache() {
    const [history, setHistory] = useState<History>([]);
    const historyStore = useAppSelector(
        (state) => state["player-controls"].history,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (typeof window === undefined && !window.localStorage) return;
        const cacheHistory = localStorage.getItem("history");
        if (cacheHistory !== null) {
            const songs: History = JSON.parse(cacheHistory);
            setHistory(() => songs);
        }
    }, []);

    /* Using the state variable to wrap around the problem of server content not matching with the div */
    useEffect(() => {
        dispatch(addCustomSongInTheHistory(history));
    }, [history]);

    /* Store the values of history in the cache */
    useEffect(() => {
        if (historyStore.length > 0) {
            const songsToAdd = historyStore;
            localStorage.setItem("history", JSON.stringify(songsToAdd));
        }
    }, [historyStore]);

    return <></>;
}
