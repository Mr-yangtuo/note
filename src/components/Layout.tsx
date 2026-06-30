import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-lg font-semibold text-gray-800 bg-transparent border-none p-0 cursor-pointer shrink-0"
          >
            静态笔记
          </button>
          <SearchBar />
        </div>
      </header>
      {children}
    </div>
  );
}
