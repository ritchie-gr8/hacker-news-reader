import { Story } from "@/types/story";
import Link from "next/link";
import { ExternalLink, MessageCircle, TrendingUp, User } from "lucide-react";
import { getTimeAgo } from "@/lib/utils";

interface StoryCardProps {
  story: Story;
  returnTo?: string;
}

export function StoryCard({ story, returnTo }: StoryCardProps) {
  const timeAgo = getTimeAgo(story.time);
  const storyPageLink = `/story/${story.id}${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow w-full p-6">
      <div className="flex flex-col">
        <div className="flex items-center">
          {story.url && (
            <Link
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mr-3"
              aria-label="External link"
            >
              <ExternalLink size={16} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
            </Link>
          )}
          <Link
            href={storyPageLink}
            className="text-lg font-semibold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            {story.title}
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <TrendingUp size={14} className="text-gray-400" />
            <span>{story.score} points</span>
          </div>

          <div className="flex items-center gap-1">
            <User size={14} className="text-gray-400" />
            <span>{story.by}</span>
          </div>

          <div className="flex items-center gap-1">
            <MessageCircle size={14} className="text-gray-400" />
            <span>{story.descendants || 0} comments</span>
          </div>

          <div className="flex items-center gap-1">
            <span>•</span>
            <span>{timeAgo}</span>
          </div>

          {story.url && (
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md truncate max-w-[120px]">
                {new URL(story.url).hostname}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
