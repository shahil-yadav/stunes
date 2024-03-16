import { H4 } from "@/components/ui/h4";
import Image from "next/image";
import Link from "next/link";

type SearchCardResultsProps = {
    title: string;
    name: string;
    type: string;
    id: string;
    src: string;
};
export function SearchCardResults({
    searchFieldResults,
}: {
    searchFieldResults: SearchCardResultsProps[];
}) {
    return searchFieldResults.map((result, key) => (
        <Link key={key} href={`/${result.type}?id=${result.id}`}>
            <div
                key={result.id}
                className="flex items-center justify-between gap-x-5"
            >
                <img
                    className="md:hidden"
                    src={result.src}
                    alt={result.name}
                    width={100}
                    height={100}
                />
                <img
                    className="hidden md:block"
                    src={result.src}
                    alt={result.name}
                    width={200}
                    height={200}
                />
                <H4 className="text-xs md:text-xl">{result.name}</H4>
            </div>
        </Link>
    ));
}
