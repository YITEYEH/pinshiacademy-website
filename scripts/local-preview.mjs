import { execSync, spawn } from "node:child_process";
import { existsSync, rmSync } from "node:fs";

function sh(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

function listListenerPidsDarwin(port) {
  try {
    const out = execSync(`lsof -ti tcp:${port} -sTCP:LISTEN`, {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    return out ? out.split("\n").filter(Boolean) : [];
  } catch {
    return [];
  }
}

function killPortDarwin(port) {
  const pids = listListenerPidsDarwin(port);
  if (pids.length === 0) return;
  sh(`kill ${pids.join(" ")} 2>/dev/null || true`);
  sh(`sleep 0.3`);
  sh(`kill -9 ${pids.join(" ")} 2>/dev/null || true`);
}

const previewPort = Number(process.env.PREVIEW_PORT ?? "3001");

// Stop anything likely to conflict with local preview.
if (process.platform === "darwin") {
  sh(`pkill -f "next dev" 2>/dev/null || true`);
  sh(`pkill -f "next start" 2>/dev/null || true`);
  killPortDarwin(3000);
  killPortDarwin(previewPort);
}

rmSync(".next", { recursive: true, force: true });
for (const p of [
  ".turbo",
  "node_modules/.cache",
  "node_modules/.vite",
  "node_modules/.swc",
]) {
  if (existsSync(p)) rmSync(p, { recursive: true, force: true });
}

sh(`npm run build`);

const nextBin = execSync(`node -p "require.resolve('next/dist/bin/next')"`, {
  stdio: ["ignore", "pipe", "ignore"],
})
  .toString()
  .trim();

const child = spawn(process.execPath, [nextBin, "start", "--port", String(previewPort)], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) process.exit(1);
  process.exit(code ?? 0);
});
