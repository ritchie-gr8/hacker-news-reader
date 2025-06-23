import { Skeleton } from "@/components/ui/skeleton";
import { CommentsSkeleton } from "./comment-skeleton";

export function StoryContentSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Skeleton className="h-10 w-32 rounded-lg bg-gray-200" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-4/5 rounded bg-gray-200" />
              <Skeleton className="h-6 w-3/4 rounded bg-gray-200" />

              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-8 w-24 rounded-full bg-gray-200" />
                <Skeleton className="h-8 w-32 rounded-full bg-gray-200" />
                <Skeleton className="h-8 w-28 rounded-full bg-gray-200" />
              </div>

              <Skeleton className="h-12 w-48 rounded-lg bg-gray-200" />
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
              <Skeleton className="h-4 w-full rounded bg-gray-200" />
              <Skeleton className="h-4 w-full rounded bg-gray-200" />
              <Skeleton className="h-4 w-3/4 rounded bg-gray-200" />
              <Skeleton className="h-4 w-full rounded bg-gray-200" />
              <Skeleton className="h-4 w-5/6 rounded bg-gray-200" />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/30 px-6 md:px-8 py-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-full bg-gray-200" />
              <Skeleton className="h-5 w-32 rounded bg-gray-200" />
            </div>
          </div>

          <div className="p-6 md:p-8">
            <CommentsSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
