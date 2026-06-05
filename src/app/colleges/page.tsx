"use client";
import { useState, useMemo } from "react";
import { colleges } from "@/data/colleges";
import { College } from "@/types/colleges";
import CollegeCard from "@/components/CollegeCard";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";

export default function CollegesPage() {
  const [search, setSearch]           = useState("");
  const [filterType, setFilterType]   = useState("All");
  const [filterState, setFilterState] = useState("All");
  const [sortBy, setSortBy]           = useState("ranking");
  const [maxFees, setMaxFees]         = useState(3000000);
  const [compareList, setCompareList] = useState<College[]>([]);
  const [page, setPage]               = useState(1);
  const PER_PAGE = 6;

  const states = useMemo(() => {
    const s = Array.from(new Set(colleges.map((c) => c.state)));
    return ["All", ...s.sort()];
  }, []);

  const filtered = useMemo(() => {
    let list = [...colleges];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (filterType !== "All")  list = list.filter(c => c.type === filterType);
    if (filterState !== "All") list = list.filter(c => c.state === filterState);
    list = list.filter(c => c.fees <= maxFees);
    list.sort((a, b) => {
      if (sortBy === "ranking")   return a.ranking - b.ranking;
      if (sortBy === "rating")    return b.rating - a.rating;
      if (sortBy === "fees_asc")  return a.fees - b.fees;
      if (sortBy === "fees_desc") return b.fees - a.fees;
      return 0;
    });
    return list;
  }, [search, filterType, filterState, sortBy, maxFees]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore   = paginated.length < filtered.length;

  const handleCompare = (college: College) => {
    setCompareList(prev => {
      const exists = prev.find(c => c.id === college.id);
      if (exists) return prev.filter(c => c.id !== college.id);
      if (prev.length >= 3) return prev;
      return [...prev, college];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-950 font-body">

      {/* Header */}
      <div className="bg-navy-950 text-white py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"48px 48px" }} />
        <div className="relative max-w-6xl mx-auto">
          <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-2">Explore</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-1">Find Your College</h1>
          <p className="text-gray-400 text-sm mb-7">
            Discover {colleges.length}+ top colleges across India
          </p>
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-60 flex-shrink-0">
          <Filters
            filterType={filterType}   setFilterType={(v) => { setFilterType(v); setPage(1); }}
            filterState={filterState} setFilterState={(v) => { setFilterState(v); setPage(1); }}
            sortBy={sortBy}           setSortBy={(v) => { setSortBy(v); setPage(1); }}
            maxFees={maxFees}         setMaxFees={(v) => { setMaxFees(v); setPage(1); }}
            states={states}
            totalResults={filtered.length}
          />
        </aside>

        <main className="flex-1">
          {/* Compare Bar */}
          {compareList.length > 0 && (
            <div className="mb-5 bg-navy-900 border border-navy-700 rounded-2xl px-4 py-3 flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gold-400 font-display">
                Comparing ({compareList.length}/3)
              </span>
              {compareList.map(c => (
                <span key={c.id}
                  className="text-xs glass text-white px-3 py-1 rounded-full flex items-center gap-1.5">
                  {c.shortName}
                  <button onClick={() => handleCompare(c)} className="text-gray-400 hover:text-red-400 ml-0.5">✕</button>
                </span>
              ))}
              {compareList.length >= 2 && (
                <a href={`/compare?ids=${compareList.map(c => c.id).join(",")}`}
                  className="ml-auto text-xs bg-gold-500 text-navy-950 font-bold px-4 py-1.5 rounded-xl hover:bg-gold-400 transition-colors">
                  Compare Now →
                </a>
              )}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <div className="text-5xl mb-4">🎓</div>
              <p className="font-display text-lg font-bold text-gray-600 dark:text-gray-400">No colleges found</p>
              <p className="text-sm mt-1">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing <span className="font-semibold text-navy-900 dark:text-white">{paginated.length}</span> of{" "}
                  <span className="font-semibold text-navy-900 dark:text-white">{filtered.length}</span> colleges
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {paginated.map(college => (
                  <CollegeCard key={college.id} college={college}
                    onCompare={handleCompare}
                    isComparing={!!compareList.find(c => c.id === college.id)} />
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-10">
                  <button onClick={() => setPage(p => p + 1)}
                    className="px-8 py-3 bg-navy-900 dark:bg-white text-white dark:text-navy-900 rounded-xl font-semibold text-sm hover:bg-navy-700 dark:hover:bg-gray-100 transition-colors shadow-card">
                    Load More ({filtered.length - paginated.length} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}