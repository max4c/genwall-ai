"use client"; // Add this for client-side interactivity later

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state

export default function GeneratePage() {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setImageUrl(null);
    setError(null);
    // TODO: Implement API call in Milestone 4
    console.log("Generating image for prompt:", prompt);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    // Simulate success/error - replace with actual logic later
    if (Math.random() > 0.2) {
      // Simulate success
      setImageUrl("/placeholder-image.jpg"); // Replace with actual URL from API
    } else {
      // Simulate error
      setError("Failed to generate image. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    // Main container using flex row, ensuring it fills height below header
    <main className="flex flex-row h-[calc(100vh-theme(space.16))] md:h-[calc(100vh-theme(space.20))] overflow-hidden"> {/* Use explicit height and overflow hidden */}
      {/* Left Column: Chat Sidebar */}
      {/* Fixed width, full height, flex column, darker distinct background */}
      <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col h-full p-4 md:p-6 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
        {/* Chat history area - takes up remaining space */}
        <div className="flex-grow overflow-y-auto mb-4 rounded-md bg-gray-200 dark:bg-gray-800/50 p-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">Chat history placeholder...</p>
          {/* Add more placeholder lines to simulate content */}
          <div className="space-y-2 mt-2">
             <Skeleton className="h-4 w-3/4" />
             <Skeleton className="h-4 w-1/2" />
             <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        {/* Input Area fixed at the bottom */}
        <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700"> {/* Added border top */}
          <Textarea
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
            rows={3}
            className="resize-none border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md p-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-200"
            disabled={isLoading}
          />
          <Button 
            onClick={handleGenerate} 
            disabled={isLoading || !prompt.trim()} 
            size="lg" 
            // Apply gradient and animation classes, remove conflicting bg/hover, ensure text is white
            className="font-semibold w-full text-white bg-gradient-to-br from-pink-400 via-purple-500 via-indigo-500 to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:opacity-90"
            style={{
              backgroundSize: '300% 300%',
              animation: 'gradient-animation 20s ease infinite'
            }} // Apply size and animation via style prop as Tailwind classes might not exist
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </div>

      {/* Right Column: Results Area with White Background */}
      {/* Takes remaining width, full height, white background, centered content */}
      <div className="w-full md:w-2/3 lg:w-3/4 flex items-center justify-center p-4 md:p-8 bg-white dark:bg-gray-100 overflow-y-auto"> {/* White background */}
        {/* Result container with aspect ratio */}
        <div className="aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-800 relative w-full max-w-5xl shadow-lg"> {/* Adjusted bg for contrast, added shadow */}
          {isLoading && (
            <Skeleton className="absolute inset-0 w-full h-full bg-gray-300 dark:bg-gray-700" />
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
            <p className="text-red-600 dark:text-red-400 text-center p-4 font-medium">{error}</p> // Adjusted error color for white bg
          )}
          {!isLoading && !imageUrl && !error && (
            <p className="text-gray-500 dark:text-gray-400 text-center p-4 italic">
              Your generated wallpaper will appear here.
            </p> // Adjusted placeholder color for white bg
          )}
        </div>
      </div>
    </main>
  );
} 