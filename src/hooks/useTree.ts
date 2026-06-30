import { useEffect, useState } from "react";
import type { TreeNode } from "../types";

/** 获取目录树数据 */
export function useTree() {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/tree.json")
      .then((res) => {
        if (!res.ok) throw new Error("加载目录失败");
        return res.json();
      })
      .then((data: TreeNode) => {
        setTree(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { tree, loading, error };
}

/** 根据路径查找节点 */
export function findNodeByPath(tree: TreeNode | null, targetPath: string): TreeNode | null {
  if (!tree) return null;
  if (tree.path === targetPath) return tree;

  for (const child of tree.children ?? []) {
    const found = findNodeByPath(child, targetPath);
    if (found) return found;
  }
  return null;
}
