"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  TrendingUp,
  User,
  Clock,
  MessageCircle,
} from "lucide-react";
import { getStoryById, getComments } from "@/lib/api";
import { getTimeAgo, formatNumber, getDomainFromUrl } from "@/lib/utils";
import { CommentsSection } from "@/components/comment-section";
import { Story } from "@/types/story";
import { use } from "react";
import { useSearchParams } from "next/navigation";
import { CommentsSkeleton } from "@/components/comment-skeleton";
import { StoryContentSkeleton } from "@/components/story-content-skeleton";

function StoryContent({ id }: { id: number }) {
  const searchParams = useSearchParams();
  const returnToUrl = searchParams.get("returnTo");

  const {
    data: story,
    isLoading: isLoadingStory,
    isError: isStoryError,
  } = useQuery<Story>({
    queryKey: ["story", id],
    queryFn: () => getStoryById(id),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  const commentIds = story?.kids || [];

  const {
    data: comments,
    isLoading: isLoadingComments,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ["comments", id, commentIds],
    queryFn: () => commentIds.length ? getComments(commentIds) : [],
    enabled: commentIds.length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });


  if (isLoadingStory) return <StoryContentSkeleton />;
  if (isStoryError || !story || story.deleted || story.dead) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Story Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The story you requested may have been deleted or does not exist.
            </p>
            <Link
              href={returnToUrl || "/"}
              className="inline-flex items-center gap-2 px-5 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {returnToUrl ? "stories" : "Home"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const domain = story.url ? getDomainFromUrl(story.url) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link
            href={returnToUrl || "/"}
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {returnToUrl ? "stories" : "Home"}
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                  {story.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">
                      {formatNumber(story.score)} points
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    <User className="h-4 w-4 text-orange-500" />
                    <span>
                      by <span className="font-medium">{story.by}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>{getTimeAgo(story.time)}</span>
                  </div>
                </div>
              </div>

              {story.url && (
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
                >
                  <ExternalLink className="h-4 w-4" />
                  Read on {domain}
                </a>
              )}

              {story.text && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div
                    className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 prose-p:my-3 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-strong:font-medium prose-strong:text-gray-900 dark:prose-strong:text-white prose-headings:text-gray-900 dark:prose-headings:text-white"
                    dangerouslySetInnerHTML={{ __html: story.text }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/30 px-6 md:px-8 py-4">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Comments
                {story.descendants !== undefined && (
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-300 ml-2">
                    ({formatNumber(story.descendants)} total)
                  </span>
                )}
              </h2>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {isLoadingComments ? (
              <CommentsSkeleton />
            ) : isCommentsError ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
                  Failed to load comments
                </h3>
                <p className="text-red-600 dark:text-red-300">
                  Please try again later
                </p>
              </div>
            ) : !comments ? (
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-6 text-center">
                <MessageCircle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No comments yet
                </p>
              </div>
            ) : (
              <CommentsSection
                comments={comments}
                totalCount={story.descendants}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StoryPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const idNum = parseInt(id);
  if (isNaN(idNum)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Invalid Story ID
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The provided story ID is not valid.
          </p>
          <Link
            href="/"
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return <StoryContent id={idNum} />;
}
