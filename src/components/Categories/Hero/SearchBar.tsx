"use client";

import { useState, useRef } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SearchBarProps } from "./types";
import { HERO_CONTENT } from "./constants";

export const SearchBar = ({ categories, onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCategory || undefined);
  };

  const handleCategorySelect = (categoryId: string, categoryTitle: string) => {
    setSelectedCategory(categoryId);
    setIsDropdownOpen(false);
    
    // Focus back on search input after selection
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Display category title instead of ID for readability
  const selectedCategoryTitle = selectedCategory 
    ? categories.find(cat => String(cat.id) === selectedCategory)?.title || selectedCategory
    : HERO_CONTENT.categoryPlaceholder;

  return (
    <form 
      onSubmit={handleSearch}
      className="relative w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        {/* Search Input */}
        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={HERO_CONTENT.searchPlaceholder}
            className="w-full pl-12 pr-4 py-4 text-black focus:outline-none"
          />
        </div>

        {/* Divider - Desktop */}
        <div className="hidden md:block w-px bg-gray-200"></div>
        
        {/* Divider - Mobile */}
        <div className="md:hidden h-px w-full bg-gray-200"></div>

        {/* Category Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between px-4 py-4 bg-white text-gray-700 w-full md:w-auto md:min-w-[180px]"
          >
            <span className="truncate">{selectedCategoryTitle}</span>
            <svg 
              className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute z-10 w-full bg-white rounded-b-lg shadow-lg max-h-60 overflow-y-auto"
              >
                <div className="py-1">
                  {/* All Categories Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("");
                      setIsDropdownOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    {HERO_CONTENT.categoryPlaceholder}
                  </button>

                  {/* Category Options */}
                  {categories.map((category) => (
                    <button
                      key={String(category.id)}
                      type="button"
                      onClick={() => handleCategorySelect(String(category.id), category.title)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile separator before search button */}
        <div className="md:hidden h-px w-full bg-gray-200"></div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-black text-white px-6 py-4 font-medium hover:bg-black/90 transition-colors"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}; 