import BettaCard from "../components/BettaCard";
import { initialBettas } from "../data/mockData";

function BettaPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Betta Management
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Betta Fish
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Manage your betta fish collection.
        </p>
      </div>

      {/* Grid of Bettas */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {initialBettas.map((betta) => (
          <BettaCard key={betta.id} betta={betta} />
        ))}
      </div>
    </div>
  );
}

export default BettaPage;