import { Comment } from "@/types/comment";
import { MessageCircle } from "lucide-react";
import { CommentItem } from "./comment-item";

interface CommentsSectionProps {
  comments: Comment[];
  totalCount?: number;
}

export function CommentsSection({ comments, totalCount }: CommentsSectionProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <MessageCircle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400">No comments yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {totalCount && totalCount > comments.length && (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          Showing top {comments.length} of {totalCount} comments
        </p>
      )}
    </div>
  );
}
