"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { HERO_CONTENT } from "./constants";
import { DropdownArrowIcon, CloseIcon } from "@/components/ui/icons";
import type { SearchBarProps } from "./types";

export const SearchBar = ({ categories, onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCategory || undefined);
  };

  // Clear search query and perform search
  const handleClearSearch = () => {
    setSearchQuery("");
    if (searchQuery) {
      onSearch("", selectedCategory || undefined);
    }
  };

  // Get the display text for the selected category
  const getDisplayText = () => {
    if (!selectedCategory) return HERO_CONTENT.categoryPlaceholder;
    
    const category = categories.find(cat => cat && cat.id && String(cat.id) === selectedCategory);
    return category?.title || HERO_CONTENT.categoryPlaceholder;
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-visible">
      <div className="flex flex-col md:flex-row">
        {/* Search Input */}
        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={HERO_CONTENT.searchPlaceholder}
            className="w-full pl-12 pr-10 py-4 text-black focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span className="sr-only">Limpiar búsqueda</span>
              <CloseIcon />
            </button>
          )}
        </div>

        {/* Divider - Desktop */}
        <div className="hidden md:block w-px bg-gray-200"></div>
        
        {/* Divider - Mobile */}
        <div className="md:hidden h-px w-full bg-gray-200"></div>

        {/* Category Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between px-4 py-4 bg-white text-gray-700 w-full md:w-auto md:min-w-[180px]"
          >
            <span className="truncate">{getDisplayText()}</span>
            <DropdownArrowIcon className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          <div 
            className={`absolute left-0 right-0 top-full mt-0 bg-white rounded-b-lg shadow-lg max-h-40 overflow-y-auto border border-gray-200 transition-all duration-200 z-[100] ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible h-0'}`}
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
              
              <div className="h-px w-full bg-gray-200 my-1"></div>
              
              {/* Category Options */}
              {categories?.map(category => {
                if (!category || !category.id || !category.title) return null;
                return (
                  <button
                    key={String(category.id)}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(String(category.id));
                      setIsDropdownOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    {category.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile separator */}
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