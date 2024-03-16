import { type SongSchema } from "@/lib/definitions/songs/songs";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { H4 } from "./ui/h4";
import { H1 } from "./ui/h1";

export type CollectionSongsProps = {
    collection: {
        name: string;
        songs: SongSchema[];
    };
};

export type CollectionCardProps = {
    img: string;
    name: string;
};

function CollectionCard({ collection }: { collection: CollectionCardProps }) {
    return (
        <Card>
            <CardHeader>
                <H4 className="md:hidden">{collection.name}</H4>
                <H1 className="hidden md:block">{collection.name}</H1>
            </CardHeader>
            <CardContent>
                <div className="hidden md:block">
                    <img
                        width={250}
                        height={250}
                        src={collection.img}
                        alt={collection.name}
                    />
                </div>
                <div className="md:hidden">
                    <img
                        width={150}
                        height={150}
                        src={collection.img}
                        alt={collection.name}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export { CollectionCard };
