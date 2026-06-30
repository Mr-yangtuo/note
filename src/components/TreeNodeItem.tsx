import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { TreeNode } from "../types";

interface TreeNodeItemProps {
  node: TreeNode;
}

export default function TreeNodeItem({ node }: TreeNodeItemProps) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = decodeURIComponent(location.pathname);
  const isActive = node.isLeaf && currentPath === `/note/${node.path}`;

  const handleClick = () => {
    if (node.isLeaf) {
      navigate(`/note/${node.path}`);
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
          isActive
            ? "bg-blue-50 text-blue-700 font-medium"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {!node.isLeaf && (
          <span className="text-xs text-gray-400 w-4 shrink-0">
            {expanded ? "▾" : "▸"}
          </span>
        )}
        {node.isLeaf && <span className="text-xs text-gray-300 w-4 shrink-0">·</span>}
        <span className="truncate">{node.name}</span>
      </button>
      {!node.isLeaf && expanded && node.children && (
        <div className="ml-3 border-l border-gray-200">
          {node.children.map((child, i) => (
            <TreeNodeItem key={i} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
