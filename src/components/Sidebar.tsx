import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTree, findNodeByPath } from "../hooks/useTree";
import type { TreeNode } from "../types";

function TreeNodeItem({ node, onNavigate }: { node: TreeNode; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = decodeURIComponent(location.pathname);
  const isActive = node.isLeaf && currentPath === `/note/${node.path}`;

  const handleClick = () => {
    if (node.isLeaf) {
      navigate(`/note/${node.path}`);
      onNavigate();
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors flex items-center gap-2 ${
          isActive
            ? "bg-blue-50 text-blue-700 font-medium"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
      >
        {!node.isLeaf && (
          <span className="text-xs text-gray-400 w-3 shrink-0">
            {expanded ? "▾" : "▸"}
          </span>
        )}
        <span className="truncate">{node.name}</span>
      </button>
      {!node.isLeaf && expanded && node.children && (
        <div className="ml-3 border-l border-gray-100">
          {node.children.map((child, i) => (
            <TreeNodeItem key={i} node={child} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const { tree, loading } = useTree();
  const location = useLocation();

  // 从 URL 提取课程名
  const path = decodeURIComponent(location.pathname);
  const courseName = path.startsWith("/course/")
    ? path.slice(8)
    : path.startsWith("/note/")
      ? path.slice(6).split("/")[0]
      : "";
  const breadcrumb = findNodeByPath(tree, courseName);
  const courseNode = breadcrumb ?? tree?.children?.find((c) => c.path === courseName);

  if (loading || !courseNode) return null;

  return (
    <div className="space-y-1">
      <button
        onClick={() => navigate(`/course/${courseNode.path}`)}
        className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-800 hover:text-blue-600 bg-transparent border-none cursor-pointer"
      >
        {courseNode.name}
      </button>
      <div className="border-t border-gray-100 pt-1">
        {courseNode.children?.map((child, i) => (
          <TreeNodeItem key={i} node={child} onNavigate={() => {}} />
        ))}
      </div>
    </div>
  );
}
