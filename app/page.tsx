import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { H1 } from "@/components/ui/h1";
import { H2 } from "@/components/ui/h2";
import Link from "next/link";

export default function Page() {
    return (
        <main className="h-screen flex items-center justify-center px-5">
            <Card>
                <CardHeader>
                    <H1>Welcome to the stunes!</H1>
                </CardHeader>
                <CardContent>
                    <H2>Take me to the Homepage</H2>
                </CardContent>
                <CardFooter>
                    <Link href="/home">
                        <Button className="w-full">Home</Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}
