/**
 * Frees the dev port before `next dev` so a stale listener cannot serve
 * HTML from one build while another process owns a mismatched `.next`.
 */
import { execSync } from "node:child_process";
import { platform } from "node:os";

const port = String(process.env.PORT ?? "3000");

function killListenersUnix() {
  try {
    const out = execSync(`lsof -ti tcp:${port} -sTCP:LISTEN`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (!out) return;
    const pids = [...new Set(out.split(/\s+/).filter(Boolean))];
    console.log(`[dev] releasing port ${port}: ${pids.join(", ")}`);
    for (const pid of pids) {
      try {
        execSync(`kill -9 ${pid}`, { stdio: "ignore" });
      } catch {
        /* ignore */
      }
    }
  } catch {
    /* no listeners */
  }
}

if (platform() === "win32") {
  console.log(
    "[dev] skip automatic port release on Windows; close the old terminal or Task Manager entry if port is busy.",
  );
} else {
  killListenersUnix();
}
