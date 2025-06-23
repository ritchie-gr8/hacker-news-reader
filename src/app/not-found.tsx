import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-8 sm:p-10 text-center">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-orange-100 dark:bg-orange-900/30 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-orange-500 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-white" strokeWidth={1.5} />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Page Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button asChild variant="outline">
              <Link href="/" className="flex items-center justify-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>

            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Link href="/" className="flex items-center justify-center gap-2">
                Browse Stories
              </Link>
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/30 px-8 py-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help?{" "}
            <a
              href="#"
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
