import { Card, CardContent, CardFooter } from "@/components/ui/card";

import Link from "next/link";
import { P } from "./ui/p";

export type LinkCollectionCardProps = {
    name: string;
    src: string;
    id: string;
    type: string;
}[];

export function LinkCollectionCard({
    collections,
}: {
    collections: LinkCollectionCardProps;
}) {
    return (
        <div className="flex flex-wrap justify-start gap-2">
            {collections.map((collection, index) => (
                <Card key={index}>
                    <CardContent className="p-0 md:p-6 md:pt-6">
                        <div className="hidden md:block">
                            <Link
                                href={`/${collection.type}?id=${collection.id}`}
                            >
                                <img
                                    src={collection.src}
                                    alt={collection.name}
                                    width={180}
                                    height={180}
                                />
                            </Link>
                        </div>
                        <div className="md:hidden">
                            <Link
                                href={`/${collection.type}?id=${collection.id}`}
                            >
                                <img
                                    src={collection.src}
                                    alt={collection.name}
                                    width={110}
                                    height={110}
                                />
                            </Link>
                        </div>
                    </CardContent>
                    <CardFooter className="hidden md:block">
                        <P className="text-wrap">{collection.name}</P>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
