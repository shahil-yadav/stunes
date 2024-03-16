"use client";

import { type SongSchema } from "@/lib/definitions/songs/songs";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addSongsInThePlaylist } from "@/lib/redux/features/controlsSlice";
import { CollectionSongsProps } from "./collection-card";
import { Button } from "./ui/button";
import { formatDuration } from "@/lib/utils";
import { P } from "./ui/p";

function CollectionSongs({ collection }: CollectionSongsProps) {
    const songs = collection.songs;
    const dispatch = useAppDispatch();
    function handleAddOneSong(song: SongSchema) {
        dispatch(addSongsInThePlaylist([song]));
    }
    function handleAddMultipleSongs() {
        dispatch(addSongsInThePlaylist(songs));
    }

    return (
        <>
            <div className="flex justify-end">
                <Button
                    variant="default"
                    className="-mt-14 mr-5 w-1/4"
                    onClick={handleAddMultipleSongs}
                >
                    Play
                </Button>
            </div>
            <Table className="dark:text-white">
                <TableCaption>{collection.name}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Songs</TableHead>
                        <TableHead className="text-right">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {songs.map((song) => (
                        <TableRow
                            key={song.url}
                            onClick={() => handleAddOneSong(song)}
                            className="cursor-pointer"
                        >
                            <TableCell className="font-medium">
                                <P className="w-[90px] text-wrap xs:w-auto">
                                    {song.name}
                                </P>
                            </TableCell>

                            <TableCell className="text-right">
                                {formatDuration(song.duration)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="cursor-not-allowed">
                        <TableCell className="font-semibold text-gray-500">
                            Songs count
                        </TableCell>
                        <TableCell className="text-right">
                            {songs.length}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    );
}

export { CollectionSongs };
