export interface Story {
  id: number;
  title: string;
  by: string;
  score: number;
  time: number;
  text?: string;
  url?: string;
  kids?: number[];
  descendants?: number;
  type: "story" | "comment" | "job" | "poll";
  deleted?: boolean;
  dead?: boolean;
};
