import { cn } from "@/lib/utils";

export function H1({
    children,
    className,
}: {
    children: string;
    className?: string;
}) {
    return (
        <h1
            className={cn(
                "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl dark:text-white",
                className
            )}
        >
            {children}
        </h1>
    );
}
