import { useNavigate } from "react-router";

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-6 text-center">
      <div>
        <p className="text-7xl sm:text-8xl font-black tracking-tight text-[#0e4d58] dark:text-teal-400">
          404
        </p>

        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Page Not Found
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          The page you are looking for does not exist.
        </p>

        <button
          onClick={handleGoHome}
          className="mt-6 rounded-xl bg-[#0e4d58] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#093941] dark:bg-teal-700 dark:hover:bg-teal-600"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;