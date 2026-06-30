/**
 * 构建脚本：扫描 notes/ 目录，生成 public/tree.json
 * 用法：node src/scripts/generate-tree.cjs
 */
const fs = require("fs");
const path = require("path");

const notesDir = path.resolve(__dirname, "../../notes");
const outputDir = path.resolve(__dirname, "../../public");
const outputFile = path.join(outputDir, "tree.json");

/** 递归扫描目录，生成树结构 */
function scanDir(dirPath, relativePath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }).sort((a, b) => {
    return a.name.localeCompare(b.name, "zh-CN");
  });

  const children = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;

    const fullPath = path.join(dirPath, entry.name);
    const childRelativePath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      const sub = scanDir(fullPath, childRelativePath);
      if (sub.children && sub.children.length > 0) {
        children.push(sub);
      } else {
        children.push({
          name: entry.name,
          path: childRelativePath,
          isLeaf: false,
          children: [],
        });
      }
    } else if (entry.name.endsWith(".html")) {
      const nameNoExt = entry.name.replace(/\.html$/, "");
      children.push({
        name: nameNoExt,
        file: childRelativePath,
        path: relativePath ? `${relativePath}/${nameNoExt}` : nameNoExt,
        isLeaf: true,
      });
    }
  }

  return {
    name: path.basename(dirPath),
    path: relativePath,
    isLeaf: false,
    children,
  };
}

// 确保 public 目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const tree = scanDir(notesDir, "");
fs.writeFileSync(outputFile, JSON.stringify(tree, null, 2), "utf-8");
console.log(`✅ tree.json 已生成 → ${outputFile}`);
