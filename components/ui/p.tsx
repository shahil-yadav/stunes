import { cn } from "@/lib/utils";

export function P({
    children,
    className,
}: {
    children: string;
    className?: string;
}) {
    return (
        <p
            className={cn(
                "leading-7 [&:not(:first-child)]:mt-6 dark:text-white",
                className
            )}
        >
            {children}
        </p>
    );
}
