#!/usr/bin/env node
/**
 * Four-artifact rule: every component exported from src/index.ts must have
 *   1. a source file, 2. a co-located .test.tsx, 3. an llms.txt entry,
 *   4. a manifest.json entry — and vice versa (no manifest rot).
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

// Non-component exports that don't need manifest entries.
const EXEMPT = new Set(["chartPalette", "seriesOrder", "seriesColor", "useMeasure", "cn"]);

const indexSrc = read("src/index.ts");
const exported = [...indexSrc.matchAll(/export \{ ([^}]+) \} from "(\.[^"]+)"/g)].flatMap(([, names, from]) =>
  names
    .split(",")
    .map((n) => n.trim())
    .filter((n) => n && !n.startsWith("type "))
    .map((name) => ({ name, from })),
);

const manifest = JSON.parse(read("manifest.json"));
const manifestNames = new Set(manifest.components.map((c) => c.name));
const llms = read("llms.txt");

const errors = [];

for (const { name, from } of exported) {
  if (EXEMPT.has(name)) continue;
  const srcPath = `src/${from.replace("./", "")}.tsx`;
  const testPath = srcPath.replace(/\.tsx$/, ".test.tsx");
  if (!existsSync(join(root, srcPath))) errors.push(`${name}: missing source ${srcPath}`);
  if (!existsSync(join(root, testPath))) errors.push(`${name}: missing test ${testPath}`);
  if (!manifestNames.has(name)) errors.push(`${name}: missing manifest.json entry`);
  if (!llms.includes(name)) errors.push(`${name}: missing llms.txt entry`);
}

for (const c of manifest.components) {
  if (!exported.some((e) => e.name === c.name)) errors.push(`manifest.json lists ${c.name} but src/index.ts does not export it`);
  if (!existsSync(join(root, c.source))) errors.push(`manifest.json: ${c.name} source ${c.source} does not exist`);
}

// Docs coverage: every manifest component must appear on the docs index page.
const docsIndex = read("docs/src/pages/index.astro");
for (const c of manifest.components) {
  if (!docsIndex.includes(c.name)) errors.push(`${c.name}: not rendered in docs/src/pages/index.astro`);
}

if (errors.length) {
  console.error("check-manifest FAILED:\n" + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}
console.log(`check-manifest OK: ${manifest.components.length} components, all four artifacts present.`);
