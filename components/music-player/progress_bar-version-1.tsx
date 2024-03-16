"use client";

import { setActiveSongPlayback } from "@/lib/redux/features/controlsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

export function ProgressBar() {
    const dispatch = useAppDispatch();
    const progress = useAppSelector(
        (state) => state["player-controls"].activeSong.progressIndicator,
    );
    return (
        <input
            type="range"
            className="w-2/3 cursor-pointer border-none bg-transparent accent-gray-100"
            name="progress"
            min={0}
            max={progress.totalSongDuration}
            value={progress.seekProgress}
            onChange={(e) =>
                dispatch(
                    setActiveSongPlayback({
                        flag: true,
                        seek: e.currentTarget.valueAsNumber,
                    }),
                )
            }
        />
    );
}
