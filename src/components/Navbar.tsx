"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const toggleDark = () => {
    setDark(p => {
      const next = !p;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/colleges", label: "Colleges" },
    { href: "/compare", label: "Compare" },
    { href: "/predictor", label: "Predictor" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-white/95 dark:bg-navy-950/95 backdrop-blur-xl shadow-sm border-b border-gray-100 dark:border-white/5"
        : "bg-white dark:bg-navy-950 border-b border-gray-100 dark:border-white/5"
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-gradient-to-br from-navy-600 to-navy-800 dark:from-navy-500 dark:to-navy-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
            <span className="font-display text-white font-bold text-base leading-none">C</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-navy-900 dark:text-white text-base tracking-tight">CollegeFinder</span>
            <span className="text-[9px] text-gray-400 dark:text-gray-500 tracking-widest uppercase font-body">India's College Platform</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium font-body transition-all duration-200 ${
                pathname === link.href
                  ? "text-navy-700 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-navy-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
              }`}>
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gold-500 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button onClick={toggleDark}
            className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
            {dark
              ? <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zm0 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm9-9a1 1 0 110 2h-1a1 1 0 110-2h1zM4 12a1 1 0 110 2H3a1 1 0 110-2h1zm14.95-6.364a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM6.757 17.657a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM18.95 18.364a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM7.464 6.343a1 1 0 01-1.414 0l-.707-.707A1 1 0 016.757 4.22l.707.707a1 1 0 010 1.414zM12 7a5 5 0 100 10A5 5 0 0012 7z"/></svg>
              : <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>
            }
          </button>
          <button onClick={() => setMenuOpen(v => !v)}
            className="md:hidden w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-white/5 bg-white dark:bg-navy-950 px-4 py-3 space-y-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium font-body transition-colors ${
                pathname === link.href
                  ? "bg-navy-900 dark:bg-white/10 text-white dark:text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
              }`}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}