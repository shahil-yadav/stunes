import { cn } from "@/lib/utils";

export function H3({
    children,
    className,
}: {
    children: string;
    className?: string;
}) {
    return (
        <h3
            className={cn(
                "scroll-m-20 text-2xl font-semibold tracking-tight dark:text-white",
                className
            )}
        >
            {children}
        </h3>
    );
}
