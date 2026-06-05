"use client";
import { College } from "@/types/colleges";
import Link from "next/link";

interface Props {
  college: College;
  onCompare?: (college: College) => void;
  isComparing?: boolean;
}

export default function CollegeCard({ college, onCompare, isComparing }: Props) {
  const formatFees = (f: number) =>
    f >= 100000 ? `₹${(f / 100000).toFixed(1)}L/yr` : `₹${f.toLocaleString()}`;

  const formatPkg = (p: number) =>
    p >= 10000000 ? `₹${(p / 10000000).toFixed(1)} Cr` : `₹${(p / 100000).toFixed(1)} LPA`;

  return (
    <div className="group bg-white dark:bg-navy-900 rounded-2xl border border-gray-100 dark:border-white/5 shadow-card hover:shadow-card-lg transition-all duration-300 overflow-hidden flex flex-col">

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img src={college.image} alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${
            college.type === "Government"
              ? "bg-emerald-500/90 text-white"
              : "bg-blue-500/90 text-white"
          }`}>
            {college.type}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white border border-white/20">
            #{college.ranking}
          </span>
        </div>

        {/* Rating on image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1">
          <span className="text-gold-400 text-sm">★</span>
          <span className="text-white font-semibold text-sm">{college.rating}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-bold text-navy-900 dark:text-white text-base leading-snug line-clamp-2">
          {college.name}
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          {college.location}, {college.state}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {college.tags.map((tag) => (
            <span key={tag} className="text-[10px] bg-navy-50 dark:bg-white/5 text-navy-600 dark:text-navy-300 px-2 py-0.5 rounded-full font-medium border border-navy-100 dark:border-white/10">
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-2.5 text-center border border-gray-100 dark:border-white/5">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Fees</p>
            <p className="text-sm font-bold text-navy-900 dark:text-white mt-0.5">{formatFees(college.fees)}</p>
          </div>
          <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-2.5 text-center border border-gray-100 dark:border-white/5">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Avg Pkg</p>
            <p className="text-sm font-bold text-navy-900 dark:text-white mt-0.5">
              {formatPkg(college.placements.averagePackage)}
            </p>
          </div>
        </div>

        {/* Courses */}
        <div className="flex flex-wrap gap-1 mt-3">
          {college.courses.slice(0, 3).map((c) => (
            <span key={c} className="text-[10px] bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded">
              {c}
            </span>
          ))}
          {college.courses.length > 3 && (
            <span className="text-[10px] text-gray-400">+{college.courses.length - 3}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-white/5">
          <Link href={`/colleges/${college.id}`}
            className="flex-1 text-center text-xs font-semibold bg-navy-900 dark:bg-white text-white dark:text-navy-900 py-2.5 rounded-xl hover:bg-navy-700 dark:hover:bg-gray-100 transition-colors">
            View Details
          </Link>
          {onCompare && (
            <button onClick={() => onCompare(college)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                isComparing
                  ? "bg-red-50 border-red-200 text-red-500 dark:bg-red-900/20 dark:border-red-800"
                  : "bg-gray-50 border-gray-200 text-gray-500 dark:bg-white/5 dark:border-white/10 dark:text-gray-400 hover:border-navy-300"
              }`}>
              {isComparing ? "✕" : "+ Compare"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}