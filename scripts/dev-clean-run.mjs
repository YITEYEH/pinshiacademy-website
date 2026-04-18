import { execSync, spawn } from "node:child_process";
import { rmSync } from "node:fs";

function sh(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

function shOut(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "";
  }
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
  console.log(`[dev:clean] Killing listeners on ${port}: ${pids.join(", ")}`);
  sh(`kill ${pids.join(" ")} 2>/dev/null || true`);
  sh(`sleep 0.4`);
  sh(`kill -9 ${pids.join(" ")} 2>/dev/null || true`);
}

function waitPortFreeDarwin(port, timeoutMs = 4000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const pids = listListenerPidsDarwin(port);
    if (pids.length === 0) return true;
    sh(`sleep 0.2`);
  }
  return false;
}

const port = Number(process.env.PORT ?? "3000");

if (process.platform === "darwin") {
  // Be aggressive: multiple dev servers cause chunk 404s.
  sh(`pkill -f "next dev" 2>/dev/null || true`);
  sh(`pkill -f "next start" 2>/dev/null || true`);
  sh(`pkill -f "next/dist/bin/next.*dev" 2>/dev/null || true`);
  sh(`pkill -f "next/dist/bin/next.*start" 2>/dev/null || true`);

  // Kill anything still listening on the port (covers orphaned node processes).
  killPortDarwin(port);
  const ok = waitPortFreeDarwin(port);
  if (!ok) {
    const still = listListenerPidsDarwin(port);
    console.log(
      `[dev:clean] Port ${port} still busy after waiting. Remaining pids: ${still.join(", ")}`,
    );
    // One last attempt.
    killPortDarwin(port);
  }
}

rmSync(".next", { recursive: true, force: true });

const nextBin = shOut("node -p \"require.resolve('next/dist/bin/next')\"");
const child = spawn(process.execPath, [nextBin, "dev", "--port", String(port)], {
  stdio: ["inherit", "pipe", "pipe"],
  env: process.env,
});

let sawReady = false;
let stderrSampled = false;

child.stdout.on("data", (buf) => {
  const s = buf.toString();
  process.stdout.write(s);
  if (!sawReady && s.includes("Ready")) {
    sawReady = true;
  }
});

child.stderr.on("data", (buf) => {
  const s = buf.toString();
  process.stderr.write(s);
  if (!stderrSampled) {
    stderrSampled = true;
  }
});

child.on("error", (err) => {
  console.error(err);
});

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`[dev:clean] next dev exited with signal ${signal}`);
  }
  if (code != null && code !== 0) {
    console.error(`[dev:clean] next dev exited with code ${code}`);
  }
  process.exit(code ?? 1);
});

