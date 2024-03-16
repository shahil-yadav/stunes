"use client";

import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { P } from "@/components/ui/p";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { H2 } from "@/components/ui/h2";

type SearchCardProps = {
    title: string;
    name: string;
    type: string;
    id: string;
    src: string;
};

export function SearchCard({
    searchResult,
}: {
    searchResult: SearchCardProps;
}) {
    const { title, name, type, id, src } = searchResult;
    const { replace } = useRouter();
    function handleRedirect({ type, id }: { type: string; id: string }) {
        replace(`/${type}?id=${id}`);
    }
    return (
        <Card className="bg-transparent">
            <CardHeader>
                <H2 className="text-right">{title}</H2>
            </CardHeader>
            <CardContent>
                <div
                    onClick={() =>
                        handleRedirect({
                            type,
                            id,
                        })
                    }
                    className="flex justify-between px-5 cursor-pointer"
                >
                    <Avatar>
                        <AvatarImage src={src} />
                        <AvatarFallback>
                            <Loader2Icon className="animate-spin" />
                        </AvatarFallback>
                    </Avatar>
                    <P>{name}</P>
                </div>
            </CardContent>
        </Card>
    );
}
