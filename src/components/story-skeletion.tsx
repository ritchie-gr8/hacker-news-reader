import { Skeleton } from "@/components/ui/skeleton";
import { ITEMS_PER_PAGE } from "@/lib/constants";

export function StorySkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 w-full">
      <div className="flex items-center">
        <Skeleton className="h-5 w-5 rounded mr-3 bg-gray-100" />
        <Skeleton className="h-5 w-full max-w-md rounded bg-gray-100" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <Skeleton className="h-4 w-16 rounded bg-gray-100" />
        <Skeleton className="h-4 w-24 rounded bg-gray-100" />
        <Skeleton className="h-4 w-20 rounded bg-gray-100" />
        <Skeleton className="h-4 w-16 rounded bg-gray-100" />
        <Skeleton className="h-4 w-20 rounded ml-auto bg-gray-100" />
      </div>
    </div>
  );
}

export function StoryListSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
        <div key={i} className="flex items-start">
          <Skeleton className="flex-shrink-0 w-8 h-8 rounded-md mr-4 mt-1 bg-gray-200" />
          <StorySkeleton />
        </div>
      ))}
    </div>
  );
}
