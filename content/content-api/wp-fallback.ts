const ALERT_COOLDOWN_MS = 5 * 60 * 1000;

const lastAlertAt = new Map<string, number>();

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function shouldAlert(operation: string): boolean {
  const now = Date.now();
  const last = lastAlertAt.get(operation) ?? 0;
  if (now - last < ALERT_COOLDOWN_MS) return false;
  lastAlertAt.set(operation, now);
  return true;
}

async function notifyWebhook(payload: Record<string, unknown>) {
  const url = process.env.WP_FALLBACK_WEBHOOK_URL?.trim();
  if (!url) return;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
  } catch (webhookError) {
    console.error("[wp-fallback] webhook notify failed:", webhookError);
  }
}

/** WP GraphQL 失敗、退回 MDX 時記錄並可選發送 webhook 告警 */
export async function logWpFallback(
  operation: "getAllPosts" | "getPostBySlug",
  error: unknown,
  context?: { slug?: string },
) {
  if (!shouldAlert(operation)) return;

  const payload = {
    source: "pinshiacademy",
    type: "wp_graphql_fallback",
    operation,
    slug: context?.slug ?? null,
    error: errorMessage(error),
    endpoint: process.env.WP_GRAPHQL_URL ?? "https://blog.pinshiacademy.com/graphql",
    at: new Date().toISOString(),
  };

  console.error("[wp-fallback]", JSON.stringify(payload));

  await notifyWebhook(payload);
}
