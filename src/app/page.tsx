import Link from "next/link";
import { colleges } from "@/data/colleges";
import CollegeCard from "@/components/CollegeCard";

export default function HomePage() {
  const topColleges = colleges.slice(0, 3);

  const stats = [
    { value: "12+", label: "Colleges Listed", icon: "🏛️" },
    { value: "8+",  label: "States Covered",  icon: "🗺️" },
    { value: "50+", label: "Courses",          icon: "📚" },
    { value: "98%", label: "Top Placement",    icon: "🎯" },
  ];

  const features = [
    { icon: "🔍", title: "Smart Search",      desc: "Instant search by name, location, course or category" },
    { icon: "⚖️", title: "Compare Side-by-Side", desc: "Compare up to 3 colleges on fees, placements & more" },
    { icon: "🎯", title: "College Predictor", desc: "Enter your rank and get personalised college matches" },
    { icon: "📊", title: "Placement Data",    desc: "Real avg & highest packages with placement rates" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-950 font-body">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-950 text-white min-h-[88vh] flex items-center">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-navy-600/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-6 border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
              India's College Discovery Platform
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.1] text-white mb-6">
              Find Your
              <span className="block text-gold-400">Dream College</span>
              <span className="block text-white/50 text-4xl md:text-5xl mt-1">with Confidence</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
              Explore, compare and predict admissions to top Indian colleges — powered by real placement data and student reviews.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/colleges"
                className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-8 py-3.5 rounded-xl transition-colors text-sm shadow-lg shadow-gold-500/20">
                Explore Colleges →
              </Link>
              <Link href="/predictor"
                className="glass text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-sm">
                🎯 Try Predictor
              </Link>
            </div>
          </div>

          {/* Right — floating cards */}
          <div className="hidden lg:block relative h-96">
            {topColleges.slice(0, 2).map((c, i) => (
              <div key={c.id}
                className={`absolute glass rounded-2xl p-4 w-64 shadow-xl transition-transform hover:-translate-y-1 duration-300 ${
                  i === 0 ? "top-0 left-0" : "bottom-0 right-0"
                }`}>
                <img src={c.image} alt={c.name} className="w-full h-28 object-cover rounded-xl mb-3" />
                <p className="font-display font-bold text-white text-sm leading-snug">{c.shortName}</p>
                <p className="text-gray-400 text-xs mt-0.5">{c.location}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gold-400 text-xs font-semibold">★ {c.rating}</span>
                  <span className="text-xs text-gray-400">#{c.ranking} Ranked</span>
                </div>
              </div>
            ))}
            {/* Decorative circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-gold-500/20 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-gold-500/30 flex items-center justify-center">
                <span className="font-display text-gold-400 font-bold text-xl">CF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white dark:bg-navy-900 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="font-display text-3xl font-bold text-navy-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 tracking-wide uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-gold-500 text-xs font-semibold tracking-widest uppercase mb-3">Why CollegeFinder</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 dark:text-white">
            Everything You Need to Decide
          </h2>
          <p className="text-gray-400 mt-4 text-sm max-w-xl mx-auto leading-relaxed">
            Powerful tools to make the most important academic decision of your life.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div key={f.title}
              className="bg-white dark:bg-navy-900 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-card hover:shadow-card-lg hover:-translate-y-0.5 transition-all duration-200"
              style={{ animationDelay: `${i * 80}ms` }}>
              <div className="w-10 h-10 bg-navy-50 dark:bg-white/5 rounded-xl flex items-center justify-center text-xl mb-4">
                {f.icon}
              </div>
              <h3 className="font-display font-bold text-navy-900 dark:text-white text-sm mb-2">{f.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Top Colleges ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-gold-500 text-xs font-semibold tracking-widest uppercase mb-2">Handpicked</p>
            <h2 className="font-display text-3xl font-bold text-navy-900 dark:text-white">Top Colleges</h2>
          </div>
          <Link href="/colleges" className="text-sm font-semibold text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white flex items-center gap-1 transition-colors">
            View All <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topColleges.map((c) => <CollegeCard key={c.id} college={c} />)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"48px 48px" }} />
        <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-4">Get Started Today</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your College?
          </h2>
          <p className="text-gray-400 text-sm mb-10 max-w-md mx-auto leading-relaxed">
            Join thousands of students making smarter college decisions every day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/colleges"
              className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-8 py-3.5 rounded-xl transition-colors text-sm shadow-lg shadow-gold-500/20">
              Browse All Colleges →
            </Link>
            <Link href="/predictor"
              className="glass text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-sm">
              Try Predictor
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-navy-700 rounded-lg flex items-center justify-center">
              <span className="font-display text-white font-bold text-sm">C</span>
            </div>
            <span className="font-display text-white font-bold">CollegeFinder</span>
          </div>
          <p className="text-xs text-gray-600">© 2024 CollegeFinder · Built with Next.js & TailwindCSS</p>
          <div className="flex gap-6">
            {["/colleges", "/compare", "/predictor"].map((href) => (
              <Link key={href} href={href} className="text-xs text-gray-500 hover:text-gray-300 capitalize transition-colors">
                {href.replace("/", "")}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}