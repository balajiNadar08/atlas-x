# atlas-x

`atlas-x` is a CLI tool that visualizes directory trees along with their disk usage.  
It combines a tree-style view with human-readable file and folder sizes, making it easy to understand where space is being used in a project.

Think of it as **`tree` + `du`**, without the noise.

---

## Features

- Recursive directory tree view
- Displays size of every file
- Displays total size of each folder (including subfolders)
- Human-readable sizes (B, KB, MB, GB)
- Ignores common generated folders by default
- Allows user-defined folders to be ignored
- Works as both a CLI tool and a reusable library

---

## Default ignored folders

The following folders are ignored automatically:

- `node_modules`
- `.git`
- `.hg`
- `.svn`
- `dist`
- `build`
- `out`
- `coverage`
- `.cache`

These are typically large, generated, or not useful for size inspection.

---

## Installation

Install in your project folder using npm:

```bash
npm install atlas-x

Usage:

```bash
npx atlas-x .
