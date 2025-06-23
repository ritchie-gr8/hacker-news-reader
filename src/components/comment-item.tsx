import { Comment } from "@/types/comment";
import { getTimeAgo } from "@/lib/utils";
import { User, Clock } from "lucide-react";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <div className="flex gap-4 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
      <div className="flex-shrink-0">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
          <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <div className="font-medium text-gray-900 dark:text-white">
            {comment.by}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{getTimeAgo(comment.time)}</span>
          </div>
        </div>

        <div
          className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 prose-p:my-2 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-ul:my-2 prose-li:my-1 prose-blockquote:border-l-orange-500 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400"
          dangerouslySetInnerHTML={createMarkup(comment.text)}
        />
      </div>
    </div>
  );
}
