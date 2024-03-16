"use client"
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/h1";
import Link from "next/link";

export default function Error(){
    return <main className="h-screen flex items-center justify-center">
        <H1>The only last option is to either go to Homescreen or Refresh</H1>
        <Link href="/">
            <Button>Homepage</Button>
        </Link>
    </main>
}