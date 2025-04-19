"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

// Key for local storage (ensure this matches the key used in generate/page.tsx)
const GALLERY_STORAGE_KEY = 'genwallGallery';

// Interface for gallery item (ensure this matches the interface used in generate/page.tsx)
interface GalleryItem {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: number;
}

export default function Home() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Load items from local storage on component mount
  useEffect(() => {
    try {
      const existingItemsRaw = localStorage.getItem(GALLERY_STORAGE_KEY);
      if (existingItemsRaw) {
        const loadedItems: GalleryItem[] = JSON.parse(existingItemsRaw);
        // Sort by timestamp descending to show newest first
        loadedItems.sort((a, b) => b.timestamp - a.timestamp);
        setGalleryItems(loadedItems);
      }
    } catch (error) {
      console.error("Failed to load gallery items from local storage:", error);
      // Handle error appropriately, maybe clear corrupted storage?
      // localStorage.removeItem(GALLERY_STORAGE_KEY);
    }
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      {/* Marquee Section - Full Width */}
      <section className="w-full overflow-hidden md:py-3">
        <div className="flex whitespace-nowrap animate-marquee"> 
          {[...Array(8)].map((_, i) => ( // Increased repetitions slightly for wider screens
            <span key={i} className="text-6xl md:text-7xl lg:text-8xl font-extrabold mx-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300 py-2">
              AI Wallpapers
            </span>
          ))}
        </div>
      </section>

      {/* Main Content Section - Constrained Width */}
      <main className="container mx-auto px-4 pt-4 md:pt-6 lg:pt-8 pb-12 md:pb-16 lg:pb-20">
        {/* Hero Section (Text + Button Only) */}
        <section className="text-center mb-16 md:mb-20 lg:mb-24 flex flex-col items-center">
          {/* Title removed, it's now the marquee */}
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Create stunning, unique wallpapers tailored to your prompts using the power of generative AI. Bring your imagination to your desktop.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="font-semibold px-16 py-8 text-xl text-white bg-gradient-to-br from-pink-400 via-purple-500 via-indigo-500 to-blue-600 transition-opacity hover:opacity-95 shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300 animate-button-pulse origin-center"
            style={{
              backgroundSize: '300% 300%',
              animation: 'gradient-animation 15s ease infinite, button-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          >
            <Link href="/generate">Start Generating</Link>
          </Button>
        </section>

        {/* Gallery Section with Modals */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-white">
            Gallery Showcase
          </h2>
          {galleryItems.length > 0 ? (
            <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedItem(null)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {galleryItems.map((item) => (
                  <DialogTrigger key={item.id} asChild onClick={() => setSelectedItem(item)}>
                    <Card className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-gray-900 truncate">Prompt Snippet</CardTitle>
                        <CardDescription className="text-gray-600 line-clamp-2">{item.prompt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                          <Image 
                            src={item.imageUrl}
                            alt={item.prompt.substring(0, 50)}
                            width={500} 
                            height={281}
                            className="object-cover w-full h-full"
                            unoptimized
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                ))}
              </div>

              <DialogContent className="sm:max-w-[80vw] max-h-[90vh] flex flex-col bg-white text-gray-900">
                {selectedItem && (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-gray-900">Generated Wallpaper</DialogTitle>
                      <DialogDescription className="py-2 text-gray-600">
                        <span className="font-semibold text-gray-800">Prompt:</span> {selectedItem.prompt}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex-grow overflow-auto my-4 p-4 bg-gray-100 rounded">
                      <Image 
                        src={selectedItem.imageUrl}
                        alt={selectedItem.prompt}
                        width={1024}
                        height={576}
                        className="object-contain w-auto h-auto max-w-full max-h-full mx-auto"
                        unoptimized
                      />
                    </div>
                    <DialogFooter>
                      <Button asChild variant="secondary" className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                        <a 
                          href={selectedItem.imageUrl} 
                          download={`genwall-${selectedItem.id}.png`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </a>
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>
          ) : (
            <p className="text-center text-gray-400 italic">No generated images in your local gallery yet. Go generate some!</p>
          )}
        </section>
      </main>
    </>
  );
}
