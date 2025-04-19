import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      {/* Marquee Section - Full Width */}
      <section className="w-full overflow-hidden md:py-3">
        <div className="flex whitespace-nowrap animate-marquee"> 
          {[...Array(8)].map((_, i) => ( // Increased repetitions slightly for wider screens
            <span key={i} className="text-6xl md:text-7xl lg:text-8xl font-extrabold mx-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300 py-2">
              Dynamic AI Wallpapers
            </span>
          ))}
        </div>
      </section>

      {/* Main Content Section - Constrained Width */}
      <main className="container mx-auto">
        {/* Hero Section (Text + Button Only) */}
        <section className="text-center mb-16 md:mb-20 lg:mb-24 flex flex-col items-center">
          {/* Title removed, it's now the marquee */}
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Create stunning, unique wallpapers tailored to your prompts using the power of generative AI. Bring your imagination to your desktop.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="font-semibold px-16 py-8 text-xl text-white bg-gradient-to-br from-pink-400 via-indigo-500 to-blue-600 transition-opacity hover:opacity-95 shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300 animate-button-pulse origin-center"
            style={{
              backgroundSize: '300% 300%',
              animation: 'gradient-animation 15s ease infinite, button-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          >
            <Link href="/generate">Start Generating</Link>
          </Button>
        </section>

        {/* Gallery Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-white">
            Image Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Placeholder Title {index + 1}</CardTitle>
                  <CardDescription className="text-gray-600">Prompt snippet here...</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Image {index + 1}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
