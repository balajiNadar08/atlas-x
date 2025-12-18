#!/usr/bin/env node
import * as path from "path";
import * as fs from "fs";
import { printTree, formatSize } from "./index";

function showUsage() {
  console.log("Usage:");
  console.log("  atlas-x [path] [--folder ...]");
  console.log("");
  console.log("Description:");
  console.log("  Print a directory tree with file and folder sizes.");
  console.log("  Any argument starting with '--' is treated as a folder name to ignore.");
  console.log("");
  console.log("Examples:");
  console.log("  npx atlas-x .");
  console.log("  npx atlas-x . --confidential");
  console.log("  npx atlas-x src --imgs --temp");
}


function main() {
  const args = process.argv.slice(2);

  if (args.includes("-h") || args.includes("--help")) {
    showUsage();
    process.exit(0);
  }

  const pathArg = args.find(arg => !arg.startsWith("--"));
  const ignoreFolders = args
    .filter(arg => arg.startsWith("--"))
    .map(arg => arg.slice(2))
    .filter(name => name.length > 0);

  const target = pathArg ? path.resolve(pathArg) : process.cwd();

  try {
    const stats = fs.statSync(target);

    if (stats.isFile()) {
      console.log(
        path.basename(target) +
          " " +
          ".".repeat(40) +
          " " +
          formatSize(stats.size)
      );
      return;
    }
    
    if (stats.isDirectory()) {
      printTree(target, { ignore: ignoreFolders });
      return;
    }

    console.error("Unsupported path type");
  } catch {
    console.error("Invalid path:", target);
    process.exit(1);
  }
}

main();
