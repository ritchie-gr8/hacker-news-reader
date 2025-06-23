# Hacker News Reader

A simple Hacker News reader built with TypeScript, Next.js, React Query and Tailwind CSS.

# Features

- Fetches and displays the top 10 Hacker News stories per page, including title, author, score, and number of comments.
- Dynamic Story Details Page (`/story/[id]`) to view individual story information, external URL, and top-level comments.
- Pagination for Browse stories.
- Skeleton loading indicators for a smooth user experience.
- React Query for efficient data fetching, caching, and state management.
- Fully mobile-responsive design.
- Graceful handling and display of API errors.

# Notes

- I decided to use React Query because it provides caching out of the box, which is a plus for performance. and it also make loading states and error handling much easier.
- Since there's a bonus point for show a loading spinner, I decided to make it a client component and use skeleton loading otherwise I might went with server rendering instead.
- For pagination since there's no total number of items in the API response, I decided to use the hasMore custom property to determine if there are more items to load.
- As for the api data I use this [Hacker News API](https://github.com/HackerNews/API) for the reference.
- A 3-column layout was initially planned but discarded for a card-based list view (e.g., Reddit), as 10 items per page would lead to an unbalanced and visually unclean final row.

# Setup

1. Clone the repository:

```bash
git clone https://github.com/ritchie-gr8/hacker-news-reader.git
```

2. Install dependencies:

```bash
cd hacker-news-reader
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

5. Optional: if there is a change in the API URL, create a `.env` file and update the `NEXT_PUBLIC_HACKER_NEWS_API_BASE_URL` environment variable.
