import { useMemo } from "react";
import type { TreeNode } from "../types";

export interface SearchResult {
  name: string;
  path: string;
  /** 匹配所在的层级路径，如 "生物化学 > 第一章" */
  breadcrumb: string;
  /** 是否为叶子节点（笔记） */
  isLeaf: boolean;
  /** 跳转链接 */
  link: string;
}

/** 递归搜索 tree 节点 */
function searchInTree(
  node: TreeNode,
  keyword: string,
  parentBreadcrumb: string,
  courseName: string
): SearchResult[] {
  const results: SearchResult[] = [];
  const lower = keyword.toLowerCase();

  // 匹配课程名 / 章节名 / 文件名
  if (node.name.toLowerCase().includes(lower)) {
    results.push({
      name: node.name,
      path: node.path,
      breadcrumb: parentBreadcrumb,
      isLeaf: node.isLeaf,
      link: node.isLeaf ? `/note/${node.path}` : `/course/${node.path}`,
    });
  }

  // 递归子节点
  for (const child of node.children ?? []) {
    const newParent =
      parentBreadcrumb ||
      !node.isLeaf && node.name === courseName
        ? parentBreadcrumb
        : parentBreadcrumb
          ? `${parentBreadcrumb} > ${node.name}`
          : node.name;
    results.push(...searchInTree(child, keyword, newParent, courseName));
  }

  return results;
}

/** 搜索 tree，返回匹配结果列表 */
export function useSearch(tree: TreeNode | null, keyword: string): SearchResult[] {
  return useMemo(() => {
    if (!tree || !keyword.trim()) return [];
    const results: SearchResult[] = [];

    for (const course of tree.children ?? []) {
      results.push(...searchInTree(course, keyword.trim(), "", course.name));
    }

    return results.slice(0, 20);
  }, [tree, keyword]);
}
