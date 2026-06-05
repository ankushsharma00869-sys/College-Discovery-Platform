"use client";

import { useState, useEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search colleges, courses, locations...",
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {}, 300);
    return () => clearTimeout(timer);
  }, [value]);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={`flex items-center gap-3 w-full bg-white border-2 rounded-2xl px-4 py-3 transition-all duration-200 ${
        isFocused
          ? "border-indigo-500 shadow-lg shadow-indigo-100"
          : "border-gray-200 shadow-sm hover:border-gray-300"
      }`}
    >
      {/* Search Icon */}
      <svg
        className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
          isFocused ? "text-indigo-500" : "text-gray-400"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm outline-none"
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={handleClear}
          className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
        >
          <svg
            className="w-3 h-3 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* Keyboard Shortcut Badge */}
      {!isFocused && !value && (
        <span className="hidden sm:flex items-center gap-1 text-xs text-gray-300 border border-gray-200 rounded px-1.5 py-0.5 flex-shrink-0">
          ⌘K
        </span>
      )}
    </div>
  );
}