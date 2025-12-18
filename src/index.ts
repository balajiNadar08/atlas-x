import * as fs from "fs";
import * as path from "path";

export const IGNORE_FOLDERS = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".hg",
  ".svn",
  "out",
  "coverage",
  ".cache"
];

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
}

export function getFolderSize(folderPath: string): number {
  let total = 0;
  const items = fs.readdirSync(folderPath, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(folderPath, item.name);
    let stats: fs.Stats;
    try {
      stats = fs.statSync(fullPath);
    } catch {
      continue;
    }

    if (item.isDirectory()) {
      total += getFolderSize(fullPath);
    } else if (stats.isFile()) {
      total += stats.size;
    }
  }
  return total;
}

export function printTree(dir: string, options?: { ignore?: string[] }) {
  const IGNORE = [...IGNORE_FOLDERS, ...(options?.ignore ?? [])];
  function _print(currentDir: string, prefix = "") {
    let items: fs.Dirent[];
    try {
      items = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch (err) {
      console.error(`${prefix}⚠️  [Error reading dir] ${currentDir}`);
      return;
    }

    const visibleItems = items.filter((item) => {
      if (item.isDirectory() && IGNORE.includes(item.name)) return false;
      return true;
    });

    visibleItems.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

    visibleItems.forEach((item, idx) => {
      const isLast = idx === visibleItems.length - 1;
      const connector = isLast ? "└── " : "├── ";
      const fullPath = path.join(currentDir, item.name);
      let stats: fs.Stats | null = null;
      try {
        stats = fs.statSync(fullPath);
      } catch {
      }

      const size = item.isDirectory() ? getFolderSize(fullPath) : (stats ? stats.size : 0);
      const sizeText = formatSize(size);
      const displayName = item.isDirectory() ? `\\${item.name}` : item.name;

      const lineLength = 50;
      const dots = ".".repeat(Math.max(1, lineLength - displayName.length));
      console.log(prefix + connector + displayName + " " + dots + " " + sizeText);

      if (item.isDirectory()) {
        const newPrefix = prefix + (isLast ? "    " : "│   ");
        _print(fullPath, newPrefix);
      }
    });
  }

  _print(dir);
}

