"use client";

interface Props {
  filterType: string;
  setFilterType: (v: string) => void;
  filterState: string;
  setFilterState: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  maxFees: number;
  setMaxFees: (v: number) => void;
  states: string[];
  totalResults: number;
}

export default function Filters({
  filterType,
  setFilterType,
  filterState,
  setFilterState,
  sortBy,
  setSortBy,
  maxFees,
  setMaxFees,
  states,
  totalResults,
}: Props) {
  const types = ["All", "Government", "Private"];
  const sortOptions = [
    { value: "ranking", label: "Best Ranking" },
    { value: "rating", label: "Highest Rating" },
    { value: "fees_asc", label: "Fees: Low to High" },
    { value: "fees_desc", label: "Fees: High to Low" },
  ];

  const formatFees = (val: number) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    return `₹${val.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-6">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">Filters</h2>
        <span className="text-xs bg-indigo-50 text-indigo-600 font-medium px-2 py-1 rounded-full">
          {totalResults} colleges
        </span>
      </div>

      {/* College Type */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Type
        </p>
        <div className="flex flex-col gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`text-left text-sm px-3 py-2 rounded-xl transition-colors ${
                filterType === type
                  ? "bg-indigo-600 text-white font-semibold"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* State Filter */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          State
        </p>
        <select
          value={filterState}
          onChange={(e) => setFilterState(e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 bg-gray-50 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        >
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Max Fees Slider */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Max Annual Fees
        </p>
        <input
          type="range"
          min={10000}
          max={3000000}
          step={10000}
          value={maxFees}
          onChange={(e) => setMaxFees(Number(e.target.value))}
          className="w-full accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹10K</span>
          <span className="text-indigo-600 font-semibold">{formatFees(maxFees)}</span>
          <span>₹30L</span>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Sort By
        </p>
        <div className="flex flex-col gap-2">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSortBy(opt.value)}
              className={`text-left text-sm px-3 py-2 rounded-xl transition-colors ${
                sortBy === opt.value
                  ? "bg-indigo-600 text-white font-semibold"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setFilterType("All");
          setFilterState("All");
          setSortBy("ranking");
          setMaxFees(3000000);
        }}
        className="w-full text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 py-2 rounded-xl transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
}