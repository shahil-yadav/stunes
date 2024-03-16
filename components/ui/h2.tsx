import { cn } from "@/lib/utils";

export function H2({
    children,
    className,
}: {
    children: string;
    className?: string;
}) {
    return (
        <h2
            className={cn(
                "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 dark:text-white",
                className
            )}
        >
            {children}
        </h2>
    );
}
