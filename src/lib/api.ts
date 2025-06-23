import axios from "axios";
import { Story } from "@/types/story";
import { Comment } from "@/types/comment";

const BASE_URL = process.env.NEXT_PUBLIC_HACKER_NEWS_API_BASE_URL || "https://hacker-news.firebaseio.com/v0";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export async function getTopStoryIds(
  offset: number = 0,
  limit: number = 10
): Promise<{ ids: number[]; hasMore: boolean }> {
  try {
    const response = await api.get<number[]>("/topstories.json");
    return {
      ids: response.data.slice(offset, offset + limit),
      hasMore: response.data.length > offset + limit,
    };
  } catch (error) {
    throw new Error("Failed to fetch top stories");
  }
}

export async function getStoryById(id: number): Promise<Story> {
  try {
    const response = await api.get<Story>(`/item/${id}.json`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch story ${id}`);
  }
}

export async function getCommentById(id: number): Promise<Comment> {
  try {
    const response = await api.get<Comment>(`/item/${id}.json`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch comment ${id}`);
  }
}

export async function getComments(commentIds: number[]): Promise<Comment[]> {
  const comments = await Promise.all(
    commentIds.slice(0, 10).map(async (id) => await getCommentById(id).catch(() => null))
  );
  return comments.filter(
    (comment): comment is Comment => comment !== null && !comment.deleted
  );
}
