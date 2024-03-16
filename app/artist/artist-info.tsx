import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { H1 } from "@/components/ui/h1";
import { H2 } from "@/components/ui/h2";
import { P } from "@/components/ui/p";
import Image from "next/image";
import Link from "next/link";

export type DisplayArtistInformationPropsSchema = {
    children?: React.ReactNode;
    artist: {
        name: string;
        src: string;
        followerCount: string;
        fanCount: string;
        dominantType: string;
        dominantLanguage: string;
        bio: {
            text: string;
            title: string;
        }[];
        connect: {
            fb: string;
            wiki: string;
            twitter: string;
        };
        dob: string;
    };
};

export function DisplayArtistInformation({
    artist,
    children,
}: DisplayArtistInformationPropsSchema) {
    return (
        <Card>
            <CardHeader>
                <H1 className="hidden md:block">{artist.name}</H1>
                <Image
                    src={artist.src}
                    alt={artist.name}
                    width={200}
                    height={200}
                />
                <H2>{`${artist.dominantType}-${artist.dominantLanguage}`}</H2>
                <P>{`Followers - ${artist.followerCount}`}</P>
                <P>{`Fans - ${artist.fanCount}`}</P>
            </CardHeader>
            <CardContent>{children}</CardContent>

            <CardFooter className="flex-col">
                <div>
                    <P>About</P>
                    {artist.bio.map((sequence) => (
                        <>
                            <P>{sequence.title}</P>
                            <P>{sequence.text}</P>
                        </>
                    ))}
                    <P>{`Date of Birth - ${artist.dob}`}</P>
                    <P>Connect</P>
                    <div className="space-x-5">
                        <Link href={artist.connect.fb}>
                            <Button className="bg-blue-600 text-white">
                                Facebook
                            </Button>
                        </Link>
                        <Link href={artist.connect.twitter}>
                            <Button className="bg-blue-300">Twitter</Button>
                        </Link>
                        <Link href={artist.connect.wiki}>
                            <Button className="bg-black/50 dark:bg-white">
                                Wikipedia
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
