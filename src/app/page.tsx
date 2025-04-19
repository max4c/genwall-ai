import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      {/* Hero Section */}
      <section className="text-center mb-16 md:mb-20 lg:mb-24">
        {/* Logo removed, it's now in the global header */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Dynamic AI Wallpapers
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
          Create stunning, unique wallpapers tailored to your prompts using the power of generative AI. Bring your imagination to your desktop.
        </p>
        <Button asChild size="lg">
          <Link href="/generate">Start Generating</Link>
        </Button>
      </section>

      {/* Gallery Section */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          Gallery Showcase
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {/* Placeholder Cards - Replace with actual generated images later */}
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <CardTitle>Placeholder Title {index + 1}</CardTitle>
                <CardDescription>Prompt snippet here...</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder for image - changed aspect ratio */}
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Image {index + 1}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
