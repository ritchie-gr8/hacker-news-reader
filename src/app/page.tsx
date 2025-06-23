"use client";

import { StoryCard } from "@/components/story-card";
import { getStoryById, getTopStoryIds } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StoryListSkeleton } from "@/components/story-skeletion";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { Suspense } from "react";
import Navbar from "@/components/navbar";

async function fetchStories(page: number) {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const topStoryIds = await getTopStoryIds(offset, ITEMS_PER_PAGE);
  const stories = await Promise.all(
    topStoryIds.ids.map((id) => getStoryById(id).catch(() => null))
  );
  return {
    stories,
    hasMore: topStoryIds.hasMore,
  };
}

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stories", page],
    queryFn: () => fetchStories(page),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const currentHomePath = `/?${searchParams.toString()}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Navbar page={page} />

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <StoryListSkeleton />
        ) : isError ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium text-red-800 dark:text-red-200 mb-2">
              Failed to load stories
            </h3>
            <p className="text-red-600 dark:text-red-300 mb-4">
              Please try again later
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            >
              Retry
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {data?.stories.map(
              (story, index) =>
                story && (
                  <div
                    key={story.id}
                    className="transition-all hover:scale-[1.005]"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-0 sm:mr-4 mt-1">
                        <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                          {index + 1 + (page - 1) * ITEMS_PER_PAGE}
                        </div>
                      </div>
                      <StoryCard story={story} returnTo={currentHomePath} />
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </main>

      <footer className="container mx-auto px-4 pb-4 sm:py-8">
        <div className="flex flex-row justify-center sm:justify-between items-center gap-4">
          <Button
            disabled={page <= 1}
            onClick={() => router.push(`/?page=${page - 1}`)}
            className="cursor-pointer flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Previous Page</span>
          </Button>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page {page}
          </div>

          <Button
            disabled={!data?.hasMore}
            onClick={() => router.push(`/?page=${page + 1}`)}
            className="cursor-pointer flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="hidden sm:inline">Next Page</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
          <Navbar page={1} />
          <StoryListSkeleton />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
