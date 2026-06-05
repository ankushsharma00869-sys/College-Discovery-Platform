import { colleges } from "@/data/colleges";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CollegeDetailPage({ params }: Props) {
  const { id } = await params;
  const college = colleges.find((c) => c.id === id);
  if (!college) return notFound();

  const formatFees = (fees: number) => {
    if (fees >= 100000) return `₹${(fees / 100000).toFixed(1)} LPA`;
    return `₹${fees.toLocaleString()}`;
  };

  const formatPackage = (pkg: number) => {
    if (pkg >= 10000000) return `₹${(pkg / 10000000).toFixed(1)} Cr`;
    if (pkg >= 100000) return `₹${(pkg / 100000).toFixed(1)} LPA`;
    return `₹${pkg.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="relative h-64 w-full overflow-hidden">
        <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white max-w-5xl mx-auto">
          <Link href="/colleges" className="text-xs text-white/70 hover:text-white mb-2 inline-block">
            ← Back to Colleges
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">{college.name}</h1>
          <p className="text-white/80 text-sm mt-1">
            {college.location}, {college.state} · Est. {college.established}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">Overview</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{college.overview}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {college.tags.map((tag) => (
                <span key={tag} className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">Courses Offered</h2>
            <div className="flex flex-wrap gap-2">
              {college.courses.map((course) => (
                <span key={course} className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl font-medium">
                  {course}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Placements</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <p className="text-xl font-bold text-green-700 dark:text-green-400">
                  {formatPackage(college.placements.averagePackage)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Avg Package</p>
              </div>
              <div className="text-center bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <p className="text-xl font-bold text-blue-700 dark:text-blue-400">
                  {formatPackage(college.placements.highestPackage)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Highest Package</p>
              </div>
              <div className="text-center bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                <p className="text-xl font-bold text-purple-700 dark:text-purple-400">
                  {college.placements.placementRate}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Placement Rate</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Student Reviews</h2>
            <div className="space-y-4">
              {college.reviews.map((review, i) => (
                <div key={i} className="border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold text-sm">
                      {review.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{review.author}</p>
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, j) => (
                          <span key={j} className={j < review.rating ? "text-yellow-400 text-xs" : "text-gray-200 dark:text-gray-700 text-xs"}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
            <h3 className="text-sm font-bold text-gray-700 dark:text-white mb-4">Quick Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Type</span>
                <span className={`font-semibold px-2 py-0.5 rounded-full text-xs ${college.type === "Government" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                  {college.type}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Ranking</span>
                <span className="font-bold text-gray-800 dark:text-white">#{college.ranking}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Rating</span>
                <span className="font-bold text-yellow-500">{college.rating} ★</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Annual Fees</span>
                <span className="font-bold text-gray-800 dark:text-white">{formatFees(college.fees)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Established</span>
                <span className="font-bold text-gray-800 dark:text-white">{college.established}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Location</span>
                <span className="font-bold text-gray-800 dark:text-white text-right">{college.location}, {college.state}</span>
              </div>
            </div>
          </div>

          <Link href={`/compare?ids=${college.id}`} className="block text-center bg-indigo-600 text-white py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition-colors text-sm">
            + Add to Compare
          </Link>
          <Link href="/colleges" className="block text-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 py-3 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm">
            ← All Colleges
          </Link>
        </div>
      </div>
    </div>
  );
}