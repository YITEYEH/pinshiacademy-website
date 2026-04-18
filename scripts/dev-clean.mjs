import { execSync } from "node:child_process";
import { rmSync } from "node:fs";

function sh(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

function killPortDarwin(port) {
  // lsof exits non-zero when nothing is listening; that's fine.
  let pids = "";
  try {
    pids = execSync(`lsof -ti tcp:${port} -sTCP:LISTEN`, {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    pids = "";
  }

  if (!pids) return;

  // kill -TERM first, then -KILL if still alive
  sh(`kill ${pids} 2>/dev/null || true`);
  sh(`sleep 0.3`);
  sh(`kill -9 ${pids} 2>/dev/null || true`);
}

const port = Number(process.env.PORT ?? "3000");

function killLikelyNextDevProcesses() {
  // Best-effort cleanup. If nothing matches, ignore.
  try {
    sh(`pkill -f "next dev" 2>/dev/null || true`);
    sh(`pkill -f "next start" 2>/dev/null || true`);
  } catch {
    // ignore
  }
}

if (process.platform === "darwin") {
  killLikelyNextDevProcesses();
  killPortDarwin(port);
} else {
  console.warn(
    `[dev:clean] Unsupported platform "${process.platform}". Skipping port-kill.`,
  );
}

rmSync(".next", { recursive: true, force: true });
console.log(`[dev:clean] Cleaned .next and freed port ${port}.`);

