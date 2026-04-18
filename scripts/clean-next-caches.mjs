import { existsSync, rmSync } from "node:fs";

const paths = [".next", ".turbo", "node_modules/.cache", "node_modules/.vite", "node_modules/.swc"];
for (const p of paths) {
  if (existsSync(p)) rmSync(p, { recursive: true, force: true });
}
