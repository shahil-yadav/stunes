import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { H1 } from "@/components/ui/h1";
import { H3 } from "@/components/ui/h3";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchSearchResults } from "@/lib/data/search";
import { SearchCardResults } from "../search-card-results";

export default async function Page({
    params,
}: {
    params?: {
        query?: string;
    };
}) {
    const text = params?.query;
    if (!text) return;
    const searchResults = await fetchSearchResults(text);
    return (
        <ScrollArea className="h-screen pb-28">
            <div className="m-5 space-y-3">
                {!searchResults && (
                    <H1 className="text-red-500">
                        Ooopsy Daisy! We have no results as of it
                    </H1>
                )}

                {searchResults && (
                    <ScrollArea className="h-[90vh] pb-20">
                        {Object.entries(searchResults).map((val, index) => {
                            const [searchField, searchFieldResults] = val;
                            if (searchFieldResults.length !== 0) {
                                return (
                                    <Card key={index} className="my-2">
                                        <CardHeader>
                                            <H3>{`${searchField[0].toUpperCase()}${searchField.slice(
                                                1,
                                            )}`}</H3>
                                        </CardHeader>
                                        <CardContent className="flex cursor-pointer flex-wrap justify-between gap-4 xs:gap-3 md:gap-7">
                                            <SearchCardResults
                                                searchFieldResults={
                                                    searchFieldResults
                                                }
                                            />
                                        </CardContent>
                                    </Card>
                                );
                            }
                        })}
                    </ScrollArea>
                )}
            </div>
        </ScrollArea>
    );
}
