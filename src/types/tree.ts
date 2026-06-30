/** 树节点 — 表示目录或笔记文件 */
export interface TreeNode {
  /** 显示名称 */
  name: string;
  /** 子节点（有 children 则为目录，无则为叶子节点） */
  children?: TreeNode[];
  /** 叶子节点：HTML 文件路径（相对于 notes 目录） */
  file?: string;
  /** 从根到当前节点的路径（如 "生物化学/第一章"） */
  path: string;
  /** 是否为叶子节点（文件） */
  isLeaf: boolean;
}
