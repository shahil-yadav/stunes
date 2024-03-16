import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchInput } from "./search-input";
import { Separator } from "@/components/ui/separator";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ScrollArea className="h-screen">
            <div className="h-[52px]" />
            <Separator />
            <SearchInput />
            {children}
        </ScrollArea>
    );
}
