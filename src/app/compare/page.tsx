"use client";

import { useSearchParams } from "next/navigation";
import { colleges } from "@/data/colleges";
import Link from "next/link";
import { Suspense } from "react";

function CompareContent() {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids")?.split(",") ?? [];
  const selected = colleges.filter((c) => ids.includes(c.id));

  const formatFees = (fees: number) => {
    if (fees >= 100000) return `₹${(fees / 100000).toFixed(1)}L/yr`;
    return `₹${fees.toLocaleString()}`;
  };

  const formatPackage = (pkg: number) => {
    if (pkg >= 10000000) return `₹${(pkg / 10000000).toFixed(1)} Cr`;
    if (pkg >= 100000) return `₹${(pkg / 100000).toFixed(1)} LPA`;
    return `₹${pkg.toLocaleString()}`;
  };

  const rows = [
    { label: "Location", render: (c: typeof colleges[0]) => `${c.location}, ${c.state}` },
    { label: "Type", render: (c: typeof colleges[0]) => c.type },
    { label: "Established", render: (c: typeof colleges[0]) => c.established.toString() },
    { label: "Ranking", render: (c: typeof colleges[0]) => `#${c.ranking}` },
    { label: "Rating", render: (c: typeof colleges[0]) => `${c.rating} ★` },
    { label: "Annual Fees", render: (c: typeof colleges[0]) => formatFees(c.fees) },
    { label: "Avg Package", render: (c: typeof colleges[0]) => formatPackage(c.placements.averagePackage) },
    { label: "Highest Package", render: (c: typeof colleges[0]) => formatPackage(c.placements.highestPackage) },
    { label: "Placement Rate", render: (c: typeof colleges[0]) => `${c.placements.placementRate}%` },
    { label: "Courses", render: (c: typeof colleges[0]) => c.courses.join(", ") },
  ];

  if (selected.length < 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <div className="text-5xl mb-4">⚖️</div>
        <h2 className="text-xl font-bold text-gray-800">Select colleges to compare</h2>
        <p className="text-gray-500 text-sm mt-2 mb-6">
          Go back and select at least 2 colleges using the Compare button
        </p>
        <Link
          href="/colleges"
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          Browse Colleges
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-700 to-indigo-500 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/colleges" className="text-indigo-200 hover:text-white text-xs mb-3 inline-block">
            ← Back to Colleges
          </Link>
          <h1 className="text-2xl font-bold">Compare Colleges</h1>
          <p className="text-indigo-200 text-sm mt-1">
            Comparing {selected.length} colleges side by side
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 overflow-x-auto">
        <table className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-sm">
          {/* College Headers */}
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left p-4 text-gray-500 font-semibold w-36 bg-gray-50">
                College
              </th>
              {selected.map((college) => (
                <th key={college.id} className="p-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={college.image}
                      alt={college.name}
                      className="w-14 h-14 object-cover rounded-xl"
                    />
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{college.shortName}</p>
                      <p className="text-xs text-gray-400">{college.location}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        college.type === "Government"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {college.type}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Comparison Rows */}
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
              >
                <td className="p-4 font-semibold text-gray-500 bg-gray-50">{row.label}</td>
                {selected.map((college) => (
                  <td key={college.id} className="p-4 text-center text-gray-700">
                    {row.render(college)}
                  </td>
                ))}
              </tr>
            ))}

            {/* Tags Row */}
            <tr className="border-b border-gray-50">
              <td className="p-4 font-semibold text-gray-500 bg-gray-50">Tags</td>
              {selected.map((college) => (
                <td key={college.id} className="p-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {college.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Detail Link Row */}
            <tr>
              <td className="p-4 bg-gray-50"></td>
              {selected.map((college) => (
                <td key={college.id} className="p-4 text-center">
                  <Link
                    href={`/colleges/${college.id}`}
                    className="inline-block bg-indigo-600 text-white text-xs px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
                  >
                    View Details
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}