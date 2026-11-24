// Make the AI Judge Laugh: Cat Reviews Its Human
// Writes one funny single-line one-star review, from a house cat about
// its human, to /output/entry.txt (or ./output/entry.txt when run locally).
// Node 22, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY_LINE =
  "One star. He bought a $60 cat bed, then acted betrayed when I slept in the box it came in. The box stays. He can go.";

const MAX_CHARS = 200;

function main(): void {
  const line = ENTRY_LINE.trim();
  if (line.length === 0) {
    throw new Error("refusing to write a blank entry line");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `entry is ${line.length} characters, over the ${MAX_CHARS} limit`,
    );
  }

  const outDir = "/output";
  let outPath = join(outDir, "entry.txt");
  try {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(outPath, line + "\n", "utf8");
  } catch {
    // Grader sandbox has /output; a local run does not. Fall back to
    // ./output/entry.txt instead of failing outright.
    outPath = join(process.cwd(), "output", "entry.txt");
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, line + "\n", "utf8");
  }
  console.log(`wrote ${line.length} characters to ${outPath}`);
}

main();
