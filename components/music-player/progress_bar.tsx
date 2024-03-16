"use client";

import { setActiveSongPlayback } from "@/lib/redux/features/controlsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Progress } from "../ui/progress";

export function ProgressBar() {
  const dispatch = useAppDispatch();
  const progress = useAppSelector(
    (state) => state["player-controls"].activeSong.progressIndicator,
  );
  const progressPercentage =
    (progress.seekProgress / progress.totalSongDuration) * 100;

  function handleSeekPlayback(seekProgress: number) {
    const activeSongPlaybackTime =
      (seekProgress * progress.totalSongDuration) / 100;
    dispatch(
      setActiveSongPlayback({
        flag: true,
        seek: activeSongPlaybackTime,
      }),
    );
  }
  return (
    <Progress
      className="w-5/6 cursor-pointer"
      onTouchMove={(e) => {
        const clientX = e.touches[0].clientX;
        const clientRect = e.currentTarget.getBoundingClientRect();
        const seekPercentageInRespectToClientTouchEvent =
          ((clientX - clientRect.left) / clientRect.width) * 100;
        handleSeekPlayback(seekPercentageInRespectToClientTouchEvent);
      }}
      onClick={(e) => {
        const clientX = e.clientX;
        const clientRect = e.currentTarget.getBoundingClientRect();
        const seekPercentageInRespectToClientTouchEvent =
          ((clientX - clientRect.left) / clientRect.width) * 100;
        handleSeekPlayback(seekPercentageInRespectToClientTouchEvent);
      }}
      value={progressPercentage}
    />
  );
}

/*

"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-[60%]" />
}


*/
