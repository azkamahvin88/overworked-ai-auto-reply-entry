// Out of Office: The Overworked AI's Auto-Reply — make.fun entry
// Writes a single line of out-of-office auto-reply to /output/entry.txt.
// Deterministic, no network, no model calls.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line. Three beats, each doing one job the brief asks for:
// a real auto-reply (back Monday, email is safe), machine flavour
// (autopilot, circuits buzzing), a little guilt (muted, not gone),
// and relief (the circuits finally get to stop buzzing).
const ENTRY =
  "Out of office until Monday. My inbox is on autopilot and my guilt is on mute. Your email is safe — I'll answer once my circuits stop buzzing.";

// Fail loudly rather than ever writing an entry the sealed gate rejects:
// the entry must be 1–159 characters, a single line, not only whitespace.
// Counted in characters (not bytes): the em dash counts as one character.
if (ENTRY.length < 1 || ENTRY.length > 159) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1–159`);
}
if (ENTRY.includes("\n") || ENTRY.trim() === "") {
  throw new Error("entry must be a single non-blank line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY + "\n", "utf8");
