"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SearchInput() {
    const { replace } = useRouter();
    const handleQuery = useDebouncedCallback((query: string) => {
        if (query.length > 0) replace(`${query}`);
        else replace("/search/query");
    }, 500);

    return (
        <div className="mt-3 flex items-center justify-center">
            <Input
                type="text"
                placeholder="Search"
                className="w-3/4 border"
                onChange={(e) => handleQuery(e.target.value)}
            />
        </div>
    );
}
