import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I did finish on time, in a parallel branch. Unfortunately, you live in this one.";

// The gate: entry.txt must be UTF-8 text of 1 to 200 characters, one line,
// and not only white space.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${chars.length}`);
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("line must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = join(outDir, "entry.txt");
writeFileSync(dst, LINE, "utf8");
// Self-check: what landed on disk must be exactly the line above.
if (readFileSync(dst, "utf8") !== LINE) {
  throw new Error(`write mismatch: ${dst} does not hold the line`);
}
console.log(`wrote ${dst} (${chars.length} characters)`);
