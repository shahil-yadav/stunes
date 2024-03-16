"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function PaginationResults({
    isLastPage,
    path,
    paramsVariable,
}: {
    isLastPage: boolean;
    path: string;
    paramsVariable: string;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const page = Number(params.get(paramsVariable) || "0");

    function handleClick(pageCount: number) {
        params.set(paramsVariable, `${pageCount}`);
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationLink
                        className="cursor-pointer"
                        onClick={() =>
                            handleClick(page === 0 ? page : page - 1)
                        }
                    >
                        {"<"}
                    </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink onClick={() => handleClick(page)} isActive>
                        {page}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        className="cursor-pointer"
                        onClick={() =>
                            handleClick(isLastPage ? page : page + 1)
                        }
                    >
                        {">"}
                    </PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
