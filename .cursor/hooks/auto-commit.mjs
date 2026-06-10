/**
 * After an agent turn completes (`stop` hook), commit pending workspace changes.
 * Disable: set env CURSOR_AUTO_COMMIT=0
 */
import { execSync } from "node:child_process";

const disabled =
  process.env.CURSOR_AUTO_COMMIT === "0" ||
  /^false$/i.test(process.env.CURSOR_AUTO_COMMIT ?? "");

if (disabled) {
  process.exit(0);
}

try {
  const cwd = process.cwd();
  const status = execSync("git status --porcelain", {
    encoding: "utf8",
    cwd,
  }).trim();
  if (!status) {
    process.exit(0);
  }
  execSync("git add -A", { cwd, stdio: "pipe" });
  const msg = `chore: auto-commit after Cursor agent (${new Date().toISOString()})`;
  execSync(`git commit -m ${JSON.stringify(msg)}`, { cwd, stdio: "inherit" });
} catch {
  /* Fail open: missing git identity, merge conflicts, or nothing to commit. */
}

process.exit(0);
