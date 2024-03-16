import { LucideLoader2 } from "lucide-react";

export default function Loading() {
    return (
        <main className="h-screen flex items-center justify-center">
            <LucideLoader2 className="w-9 animate-spin aspect-square dark:text-white" />
        </main>
    );
}
