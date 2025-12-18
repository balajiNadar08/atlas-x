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

Here’s a cleaner, more professional version with clearer structure and a bit of guidance—no emoji clutter, just useful signal:

````md
## Installation

Install **atlas-x** as a project dependency:

```bash
npm install atlas-x
````

> This installs `atlas-x` locally so it can be used per project without polluting the global environment.

## Usage

Run `atlas-x` using `npx` from your project root:

```bash
npx atlas-x .
```
OR
```bash
npx atlas-x [path]
```

This command analyzes the current directory and outputs the folder and file size breakdown.

You can also pass flags to ignore specific folders:

```bash
npx atlas-x . --confidential
```
