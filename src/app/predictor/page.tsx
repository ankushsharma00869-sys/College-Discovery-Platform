"use client";

import { useState } from "react";
import { colleges } from "@/data/colleges";
import { College } from "@/types/colleges";
import CollegeCard from "@/components/CollegeCard";
import Link from "next/link";

type Result = { college: College; chance: number };

const EXAM_RANK_MAP: Record<string, { max: number; label: string }> = {
  JEE_ADVANCED: { max: 50000, label: "JEE Advanced" },
  JEE_MAINS: { max: 1000000, label: "JEE Mains" },
  NEET: { max: 1000000, label: "NEET" },
  CAT: { max: 300000, label: "CAT" },
  CLAT: { max: 100000, label: "CLAT" },
};

const EXAM_COLLEGE_TAGS: Record<string, string[]> = {
  JEE_ADVANCED: ["Engineering", "Top Ranked", "Research"],
  JEE_MAINS: ["Engineering", "Private", "South India"],
  NEET: ["Medical"],
  CAT: ["MBA", "Management"],
  CLAT: ["Law"],
};

function getPredictions(exam: string, rank: number): Result[] {
  const tags = EXAM_COLLEGE_TAGS[exam] || [];
  const { max } = EXAM_RANK_MAP[exam];
  const percentile = ((max - rank) / max) * 100;

  return colleges
    .filter((c) => c.tags.some((t) => tags.includes(t)))
    .map((c): Result => {
      const rankScore = (20 - c.ranking) / 20;
      let chance = 0;

      if (percentile >= 99)
        chance = rankScore >= 0.9 ? 90 : rankScore >= 0.7 ? 75 : 60;
      else if (percentile >= 97)
        chance = rankScore >= 0.9 ? 70 : rankScore >= 0.7 ? 85 : 75;
      else if (percentile >= 90)
        chance = rankScore >= 0.9 ? 40 : rankScore >= 0.7 ? 65 : 80;
      else if (percentile >= 75)
        chance = rankScore >= 0.9 ? 15 : rankScore >= 0.7 ? 40 : 70;
      else
        chance = rankScore >= 0.9 ? 5 : rankScore >= 0.7 ? 20 : 50;

      return {
        college: c,
        chance: Math.min(95, Math.max(5, Math.round(chance))),
      };
    })
    .sort((a, b) => b.chance - a.chance);
}

export default function PredictorPage() {
  const [exam, setExam] = useState<string>("");
  const [rank, setRank] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);
  const [searched, setSearched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handlePredict = () => {
    setError("");

    if (!exam) {
      setError("Please select an exam.");
      return;
    }

    const rankNum = parseInt(rank);
    if (!rank || isNaN(rankNum) || rankNum < 1) {
      setError("Please enter a valid rank.");
      return;
    }

    const { max } = EXAM_RANK_MAP[exam];
    if (rankNum > max) {
      setError(
        `Rank must be between 1 and ${max.toLocaleString()} for ${EXAM_RANK_MAP[exam].label}.`
      );
      return;
    }

    setLoading(true);
    setSearched(false);

    setTimeout(() => {
      const predictions: Result[] = getPredictions(exam, rankNum);
      setResults(predictions);
      setSearched(true);
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setExam("");
    setRank("");
    setResults([]);
    setSearched(false);
    setError("");
  };

  const getChanceColor = (chance: number): string => {
    if (chance >= 75)
      return "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
    if (chance >= 40)
      return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400";
    return "text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400";
  };

  const getChanceLabel = (chance: number): string => {
    if (chance >= 75) return "High Chance";
    if (chance >= 40) return "Moderate";
    return "Low Chance";
  };

  const getChanceBorder = (chance: number): string => {
    if (chance >= 75) return "border-green-200 dark:border-green-800";
    if (chance >= 40) return "border-yellow-200 dark:border-yellow-800";
    return "border-red-200 dark:border-red-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/"
            className="text-purple-200 hover:text-white text-xs mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-3xl md:text-4xl font-black mb-3">
            College Predictor
          </h1>
          <p className="text-purple-200 text-sm md:text-base max-w-xl mx-auto">
            Enter your exam and rank to discover which colleges you have the
            best chance of getting into.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto px-4 -mt-8">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Exam Select */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Select Exam
              </label>
              <select
                value={exam}
                onChange={(e) => {
                  setExam(e.target.value);
                  setError("");
                }}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 transition-all"
              >
                <option value="">-- Choose Exam --</option>
                {Object.entries(EXAM_RANK_MAP).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Rank Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Your Rank
              </label>
              <input
                type="number"
                value={rank}
                onChange={(e) => {
                  setRank(e.target.value);
                  setError("");
                }}
                placeholder={
                  exam
                    ? `1 – ${EXAM_RANK_MAP[exam]?.max.toLocaleString()}`
                    : "Enter your rank"
                }
                min={1}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 transition-all placeholder-gray-400"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-2.5 rounded-xl">
              ⚠️ {error}
            </div>
          )}

          {/* Exam Info */}
          {exam && (
            <div className="mb-4 text-xs text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 px-4 py-2.5 rounded-xl">
              📋 Showing colleges for{" "}
              <strong>{EXAM_RANK_MAP[exam].label}</strong> — max rank{" "}
              <strong>{EXAM_RANK_MAP[exam].max.toLocaleString()}</strong>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePredict}
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Predicting...
                </>
              ) : (
                "🎯 Predict My Colleges"
              )}
            </button>

            {searched && (
              <button
                onClick={handleReset}
                className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Analyzing your rank...
            </p>
          </div>
        )}

        {/* Results */}
        {searched && !loading && (
          <>
            {results.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">😔</div>
                <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                  No colleges found for this exam
                </p>
                <p className="text-sm mt-1 text-gray-400">
                  Try a different exam or rank
                </p>
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">
                      {results.length} Colleges Found
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      Based on your {EXAM_RANK_MAP[exam].label} rank of{" "}
                      <strong className="text-purple-600 dark:text-purple-400">
                        {parseInt(rank).toLocaleString()}
                      </strong>
                    </p>
                  </div>

                  {/* Legend */}
                  <div className="hidden sm:flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
                      <span className="text-gray-500 dark:text-gray-400">High</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
                      <span className="text-gray-500 dark:text-gray-400">Moderate</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                      <span className="text-gray-500 dark:text-gray-400">Low</span>
                    </span>
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {results.map(({ college, chance }) => (
                    <div
                      key={college.id}
                      className={`relative rounded-2xl border-2 overflow-hidden ${getChanceBorder(chance)}`}
                    >
                      {/* Chance Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <div
                          className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border ${getChanceColor(chance)} border-current`}
                        >
                          {getChanceLabel(chance)} · {chance}%
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-800 z-10">
                        <div
                          className={`h-full ${
                            chance >= 75
                              ? "bg-green-500"
                              : chance >= 40
                              ? "bg-yellow-500"
                              : "bg-red-400"
                          }`}
                          style={{ width: `${chance}%` }}
                        />
                      </div>

                      <CollegeCard college={college} />
                    </div>
                  ))}
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-center text-gray-400 dark:text-gray-600 mt-8 max-w-xl mx-auto">
                  ⚠️ These predictions are indicative and based on general
                  admission trends. Actual cutoffs may vary. Always verify with
                  official sources.
                </p>
              </>
            )}
          </>
        )}

        {/* Empty Initial State */}
        {!searched && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎓</div>
            <p className="text-base font-semibold text-gray-400 dark:text-gray-600">
              Enter your exam and rank above to get predictions
            </p>
          </div>
        )}
      </div>
    </div>
  );
}