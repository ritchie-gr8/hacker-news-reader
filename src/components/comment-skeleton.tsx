import { Skeleton } from "@/components/ui/skeleton";

export function CommentsSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex-shrink-0">
            <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex gap-3">
              <Skeleton className="h-4 w-24 rounded bg-gray-200" />
              <Skeleton className="h-4 w-20 rounded bg-gray-200" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full rounded bg-gray-200" />
              <Skeleton className="h-3 w-5/6 rounded bg-gray-200" />
              <Skeleton className="h-3 w-4/6 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
