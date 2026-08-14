import TankCard from "../components/TankCard";
import { initialTanks } from "../data/mockData";

function TankPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Aquarium Management
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Aquarium Tanks
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Manage your aquarium setups.
        </p>
      </div>

      {/* Grid of Tanks */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {initialTanks.map((tank) => (
          <TankCard key={tank.id} tank={tank} />
        ))}
      </div>
    </div>
  );
}

export default TankPage;