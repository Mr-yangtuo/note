import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTree } from "../hooks/useTree";
import { useSearch } from "../hooks/useSearch";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { tree } = useTree();
  const results = useSearch(tree, query);

  // 点击外部关闭
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ESC 关闭
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = useCallback(
    (link: string) => {
      setQuery("");
      setOpen(false);
      navigate(link);
    },
    [navigate]
  );

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="search"
        placeholder="搜索课程/笔记..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(e.target.value.length > 0);
        }}
        onFocus={() => {
          if (query.length > 0) setOpen(true);
        }}
        className="w-40 sm:w-56 h-8 px-3 text-sm bg-gray-100 border border-transparent
                   rounded-lg focus:outline-none focus:bg-white focus:border-blue-300
                   focus:w-56 sm:focus:w-64 transition-all placeholder:text-gray-400"
      />

      {open && results.length > 0 && (
        <div className="absolute top-full right-0 mt-1 w-72 sm:w-80 bg-white border
                        border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
          <div className="max-h-80 overflow-y-auto py-1">
            {results.map((r, i) => (
              <button
                key={i}
                onClick={() => handleSelect(r.link)}
                className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors"
              >
                <div className="text-sm font-medium text-gray-800">{r.name}</div>
                {r.breadcrumb && (
                  <div className="text-xs text-gray-400 mt-0.5 truncate">
                    {r.breadcrumb}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {open && query && results.length === 0 && (
        <div className="absolute top-full right-0 mt-1 w-72 bg-white border
                        border-gray-200 rounded-xl shadow-lg z-50">
          <div className="px-4 py-3 text-sm text-gray-400">未找到匹配结果</div>
        </div>
      )}
    </div>
  );
}
