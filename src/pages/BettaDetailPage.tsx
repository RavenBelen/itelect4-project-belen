import { useNavigate, useParams, Link } from "react-router";
import { initialBettas } from "../data/mockData";

function BettaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const bettaId = Number(id);
  const betta = initialBettas.find((b) => b.id === bettaId);

  const handleBack = () => {
    navigate("/bettas");
  };

  if (!betta) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-amber-100 text-2xl dark:bg-amber-900/30">
            🐟
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Betta Not Found
          </h2>
          <p className="mt-2 text-xs text-slate-500">
            No betta profile found with ID #{id}.
          </p>
          <Link
            to="/bettas"
            className="mt-5 inline-block rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700"
          >
            ← Return to Bettas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-6 inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      >
        <span>←</span>
        <span>Back to Bettas</span>
      </button>

      {/* Header Info */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
          Betta Details
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          {betta.name}
        </h1>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          Betta ID: {betta.id}
        </p>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left: Betta Photo */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm dark:border-slate-800">
          <img
            src={
              betta.image ||
              "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80"
            }
            alt={betta.name}
            className="h-72 w-full object-cover sm:h-80"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80";
            }}
          />
        </div>

        {/* Right: Specifications */}
        <div className="flex flex-col justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-3 items-center border-b border-slate-100 pb-3 dark:border-slate-800">
              <span className="text-slate-400">Strain</span>
              <span className="col-span-2 font-bold text-slate-900 dark:text-white">
                {betta.strain}
              </span>
            </div>

            <div className="grid grid-cols-3 items-center border-b border-slate-100 pb-3 dark:border-slate-800">
              <span className="text-slate-400">Gender</span>
              <span className="col-span-2 font-bold text-slate-900 dark:text-white">
                {betta.gender}
              </span>
            </div>

            <div className="grid grid-cols-3 items-center border-b border-slate-100 pb-3 dark:border-slate-800">
              <span className="text-slate-400">Age</span>
              <span className="col-span-2 font-bold text-slate-900 dark:text-white">
                {betta.age} months
              </span>
            </div>

            <div className="grid grid-cols-3 items-center border-b border-slate-100 pb-3 dark:border-slate-800">
              <span className="text-slate-400">Price</span>
              <span className="col-span-2 font-bold text-slate-900 dark:text-white">
                ₱{betta.price.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-3 items-center pt-1">
              <span className="text-slate-400">Status</span>
              <span className="col-span-2 font-bold text-emerald-600 dark:text-emerald-400">
                {betta.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
          About {betta.name}
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          {betta.description ||
            `${betta.name} is a beautiful ${betta.strain.toLowerCase()} betta with a strong and active personality. It has vibrant colors and a healthy appetite.`}
        </p>
      </div>
    </div>
  );
}

export default BettaDetailPage;