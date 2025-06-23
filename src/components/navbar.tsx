const Navbar = ({ page }: { page: number }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="bg-orange-500 text-white px-2 py-1 rounded">
                HN
              </span>
              Hacker News
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Top stories from the Hacker News community
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
                Page {page}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
