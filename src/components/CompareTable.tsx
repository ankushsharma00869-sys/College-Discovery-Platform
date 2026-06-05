"use client";

import { College } from "@/types/colleges";
import Link from "next/link";

interface Props {
  colleges: College[];
  onRemove?: (id: string) => void;
}

export default function CompareTable({ colleges, onRemove }: Props) {
  const formatFees = (fees: number) => {
    if (fees >= 100000) return `₹${(fees / 100000).toFixed(1)}L/yr`;
    return `₹${fees.toLocaleString()}`;
  };

  const formatPackage = (pkg: number) => {
    if (pkg >= 10000000) return `₹${(pkg / 10000000).toFixed(1)} Cr`;
    if (pkg >= 100000) return `₹${(pkg / 100000).toFixed(1)} LPA`;
    return `₹${pkg.toLocaleString()}`;
  };

  const getBest = (key: string) => {
    if (key === "fees") return Math.min(...colleges.map((c) => c.fees));
    if (key === "rating") return Math.max(...colleges.map((c) => c.rating));
    if (key === "ranking") return Math.min(...colleges.map((c) => c.ranking));
    if (key === "avgPkg") return Math.max(...colleges.map((c) => c.placements.averagePackage));
    if (key === "highPkg") return Math.max(...colleges.map((c) => c.placements.highestPackage));
    if (key === "rate") return Math.max(...colleges.map((c) => c.placements.placementRate));
    return null;
  };

  const rows: {
    label: string;
    key: string;
    render: (c: College) => string;
    getValue: (c: College) => number;
    bestIsHigh: boolean;
  }[] = [
    {
      label: "Annual Fees",
      key: "fees",
      render: (c) => formatFees(c.fees),
      getValue: (c) => c.fees,
      bestIsHigh: false,
    },
    {
      label: "Rating",
      key: "rating",
      render: (c) => `${c.rating} ★`,
      getValue: (c) => c.rating,
      bestIsHigh: true,
    },
    {
      label: "Ranking",
      key: "ranking",
      render: (c) => `#${c.ranking}`,
      getValue: (c) => c.ranking,
      bestIsHigh: false,
    },
    {
      label: "Avg Package",
      key: "avgPkg",
      render: (c) => formatPackage(c.placements.averagePackage),
      getValue: (c) => c.placements.averagePackage,
      bestIsHigh: true,
    },
    {
      label: "Highest Package",
      key: "highPkg",
      render: (c) => formatPackage(c.placements.highestPackage),
      getValue: (c) => c.placements.highestPackage,
      bestIsHigh: true,
    },
    {
      label: "Placement Rate",
      key: "rate",
      render: (c) => `${c.placements.placementRate}%`,
      getValue: (c) => c.placements.placementRate,
      bestIsHigh: true,
    },
  ];

  const isBest = (row: typeof rows[0], college: College) => {
    const best = getBest(row.key);
    const val = row.getValue(college);
    return val === best;
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <table className="w-full bg-white dark:bg-gray-900 text-sm min-w-[600px]">
        {/* College Header Row */}
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800">
            <th className="p-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-50 dark:bg-gray-800/50 w-32">
              Criteria
            </th>
            {colleges.map((college) => (
              <th key={college.id} className="p-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <img
                      src={college.image}
                      alt={college.name}
                      className="w-14 h-14 object-cover rounded-xl border-2 border-gray-100 dark:border-gray-700"
                    />
                    {onRemove && (
                      <button
                        onClick={() => onRemove(college.id)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs flex items-center justify-center transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm leading-tight">
                      {college.shortName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{college.location}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      college.type === "Government"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {college.type}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Data Rows */}
        <tbody>
          {/* Location */}
          <tr className="border-b border-gray-50 dark:border-gray-800/50 bg-gray-50/30 dark:bg-gray-800/10">
            <td className="p-4 font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 text-xs uppercase tracking-wide">
              Location
            </td>
            {colleges.map((c) => (
              <td key={c.id} className="p-4 text-center text-gray-700 dark:text-gray-300 text-sm">
                {c.location}, {c.state}
              </td>
            ))}
          </tr>

          {/* Dynamic Rows with best highlighting */}
          {rows.map((row, i) => (
            <tr
              key={row.key}
              className={`border-b border-gray-50 dark:border-gray-800/50 ${
                i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/30 dark:bg-gray-800/10"
              }`}
            >
              <td className="p-4 font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 text-xs uppercase tracking-wide">
                {row.label}
              </td>
              {colleges.map((college) => {
                const best = isBest(row, college);
                return (
                  <td key={college.id} className="p-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-lg font-semibold text-sm transition-colors ${
                        best
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {row.render(college)}
                      {best && (
                        <span className="ml-1 text-xs">✓</span>
                      )}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}

          {/* Courses */}
          <tr className="border-b border-gray-50 dark:border-gray-800/50">
            <td className="p-4 font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 text-xs uppercase tracking-wide">
              Courses
            </td>
            {colleges.map((c) => (
              <td key={c.id} className="p-4">
                <div className="flex flex-wrap gap-1 justify-center">
                  {c.courses.slice(0, 3).map((course) => (
                    <span
                      key={course}
                      className="text-xs bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-0.5 rounded-full"
                    >
                      {course}
                    </span>
                  ))}
                  {c.courses.length > 3 && (
                    <span className="text-xs text-gray-400">+{c.courses.length - 3}</span>
                  )}
                </div>
              </td>
            ))}
          </tr>

          {/* Tags */}
          <tr className="border-b border-gray-50 dark:border-gray-800/50 bg-gray-50/30 dark:bg-gray-800/10">
            <td className="p-4 font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 text-xs uppercase tracking-wide">
              Tags
            </td>
            {colleges.map((c) => (
              <td key={c.id} className="p-4">
                <div className="flex flex-wrap gap-1 justify-center">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
            ))}
          </tr>

          {/* View Detail Buttons */}
          <tr>
            <td className="p-4 bg-gray-50 dark:bg-gray-800/50" />
            {colleges.map((c) => (
              <td key={c.id} className="p-4 text-center">
                <Link
                  href={`/colleges/${c.id}`}
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  View Details →
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}