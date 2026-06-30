import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

interface DocsLayoutProps {
  children: ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // 切换路由时关闭侧边栏（移动端）
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[calc(100vh-48px)] relative">
      {/* 遮罩层（移动端） */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={`fixed md:sticky top-12 z-40 md:z-0 h-[calc(100vh-48px)] w-64 shrink-0
          border-r border-gray-200 bg-white overflow-y-auto transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-3">
          <Sidebar />
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 min-w-0">
        {/* 移动端汉堡按钮 */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed bottom-4 left-4 z-20 w-10 h-10 bg-white border border-gray-200
                     rounded-full shadow-lg flex items-center justify-center text-gray-600
                     hover:bg-gray-50 transition-colors"
          aria-label="打开目录"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="max-w-3xl mx-auto px-4 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
