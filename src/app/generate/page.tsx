"use client"; // Add this for client-side interactivity later

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state

const RUNPOD_ENDPOINT_ID = "uqaa8d5t9xqvy7";
const RUNPOD_API_KEY = process.env.NEXT_PUBLIC_RUNPOD_API_KEY;

// Define desired dimensions
const WALLPAPER_WIDTH = 1024;
const WALLPAPER_HEIGHT = 576; // Approx 16:9 aspect ratio

// Key for local storage
const GALLERY_STORAGE_KEY = 'genwallGallery';

// Interface for gallery item
interface GalleryItem {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: number;
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return; // Prevent empty prompts
    if (!RUNPOD_API_KEY) {
      setError("API Key not configured. Please set NEXT_PUBLIC_RUNPOD_API_KEY.");
      return;
    }

    setIsLoading(true);
    setImageUrl(null);
    setError(null);

    const endpointUrl = `https://api.runpod.ai/v2/${RUNPOD_ENDPOINT_ID}/runsync`;

    const payload = {
      input: {
        prompt: prompt,
        width: WALLPAPER_WIDTH,
        height: WALLPAPER_HEIGHT,
        // num_inference_steps: 25, // Example other param
      }
    };

    try {
      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RUNPOD_API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // Read the body as text first, only once
        const errorText = await response.text();
        let errorDetail = errorText; // Default to the raw text

        // Try to parse it as JSON to get a more specific message
        try {
          const errJson = JSON.parse(errorText);
          // Use specific message if available, otherwise stringify the whole JSON
          errorDetail = errJson.error?.message || JSON.stringify(errJson);
        } catch (parseError) {
          // If JSON parsing fails, errorDetail remains the raw text
          console.warn("Could not parse error response as JSON:", errorText);
        }
        throw new Error(`API request failed with status ${response.status}: ${errorDetail}`);
      }

      const result = await response.json();

      // Extract image URL based on confirmed path
      const generatedImageUrl = result?.output?.image_url;

      if (generatedImageUrl) {
        setImageUrl(generatedImageUrl);

        // --- Save to Local Storage --- 
        try {
          const newItem: GalleryItem = {
            id: crypto.randomUUID(), // Simple unique ID
            prompt: prompt,
            imageUrl: generatedImageUrl,
            timestamp: Date.now()
          };
          const existingItemsRaw = localStorage.getItem(GALLERY_STORAGE_KEY);
          const existingItems: GalleryItem[] = existingItemsRaw ? JSON.parse(existingItemsRaw) : [];
          // Add new item to the beginning and limit gallery size (e.g., to 20)
          const updatedItems = [newItem, ...existingItems].slice(0, 20);
          localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updatedItems));
          console.log('Saved to gallery:', newItem);
        } catch (storageError) {
          console.error("Failed to save to local storage:", storageError);
          // Non-critical error, maybe show a subtle warning? For now, just log it.
        }
        // --- End Save --- 

      } else {
        console.error("API response missing image URL:", result);
        throw new Error("Generation succeeded, but no image URL found in the response.");
      }

    } catch (err: any) {
      console.error("Error calling Runpod API:", err);
      setError(err.message || "An unexpected error occurred during generation.");
      setImageUrl(null); // Clear any previous image on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-row h-[calc(100vh-theme(space.16))] md:h-[calc(100vh-theme(space.20))] overflow-hidden">
      {/* Left Column: Input Area Only */}
      {/* Adjusted flex structure */}
      <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col h-full p-4 md:p-6 bg-white border-r border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Enter Prompt</h2> {/* Slightly more margin */}
        {/* Textarea now grows, Button stays at bottom */}
        <Textarea
          placeholder="A serene landscape..."
          value={prompt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
          // Removed rows, added flex-grow
          className="flex-grow resize-none border border-gray-300 bg-white rounded-md p-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-200 mb-3" // Added bottom margin
          disabled={isLoading}
        />
        <Button 
          onClick={handleGenerate} 
          disabled={isLoading || !prompt.trim()} 
          size="lg" 
          className="font-semibold w-full text-white bg-gradient-to-br from-pink-400 via-purple-500 via-indigo-500 to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:opacity-90 mt-auto" // Added mt-auto to push button down
          style={{
            backgroundSize: '300% 300%',
            animation: 'gradient-animation 20s ease infinite'
          }}
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </Button>
      </div>

      {/* Right Column: Results Area */}
      <div className="w-full md:w-2/3 lg:w-3/4 flex items-center justify-center p-4 md:p-8 bg-white overflow-y-auto">
        <div className="aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 relative w-full max-w-5xl shadow-inner">
          {/* Make Skeleton more visible */}
          {isLoading && (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-200/70 backdrop-blur-sm z-10">
              <Skeleton className="h-1/2 w-1/2 bg-gray-400/50 rounded-lg" />
              <p className="absolute bottom-4 text-gray-600 animate-pulse">Generating...</p>
            </div>
          )}
          {!isLoading && imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
               src={imageUrl} 
               alt="Generated Wallpaper" 
               className="object-contain w-full h-full"
            />
          )}
          {!isLoading && error && (
            <p className="text-red-600 text-center p-4 font-medium">{error}</p>
          )}
          {!isLoading && !imageUrl && !error && (
            <p className="text-gray-500 text-center p-4 italic">
              Your generated wallpaper will appear here.
            </p>
          )}
        </div>
      </div>
    </main>
  );
} 