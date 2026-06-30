/**
 * 获取部署基础路径
 * 开发环境: "/"
 * 生产环境（GitHub Pages）: "/note/"
 */
export const BASE = import.meta.env.BASE_URL;

/** React Router basename（去掉尾部斜杠） */
export const BASENAME = BASE.replace(/\/+$/, "");

/** 拼接基础路径 */
export function withBase(p: string): string {
  return `${BASE}${p.replace(/^\//, "")}`;
}
