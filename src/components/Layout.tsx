import type { ReactNode } from "react";
import SearchBar from "./SearchBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
          <a href="/" className="text-lg font-semibold text-gray-800 no-underline shrink-0">
            静态笔记
          </a>
          <SearchBar />
        </div>
      </header>
      {children}
    </div>
  );
}
