/**
 * API Gateway – Vercel Serverless Function
 * ----------------------------------------
 * Aggregates data from:
 * - User service
 * - Order service
 *
 * Adds:
 * - Downstream request timeouts
 * - Minimal, readable request logging
 *
 * Endpoint:
 *   GET /api/profile?id=123
 */

const DEFAULT_TIMEOUT_MS = 2500;

/**
 * Fetch helper with timeout.
 * We fail fast instead of waiting forever.
 */
async function fetchWithTimeout(url, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = async (req, res) => {
  const startTime = Date.now();
  const { id } = req.query;

  // Small bit of context so logs are useful
  console.log("[GATEWAY] Incoming request", {
    path: "/api/profile",
    userId: id
  });

  const userBase = process.env.USER_SERVICE_URL;
  const orderBase = process.env.ORDER_SERVICE_URL;

  if (!userBase || !orderBase) {
    console.error("[GATEWAY] Missing environment variables");
    return res.status(500).json({
      error: "Missing environment variables",
      required: ["USER_SERVICE_URL", "ORDER_SERVICE_URL"]
    });
  }

  const userUrl = `${userBase}/api/users?id=${encodeURIComponent(id)}`;
  const orderUrl = `${orderBase}/api/orders?userId=${encodeURIComponent(id)}`;

  try {
    const [userRes, orderRes] = await Promise.all([
      fetchWithTimeout(userUrl),
      fetchWithTimeout(orderUrl)
    ]);

    if (!userRes.ok || !orderRes.ok) {
      console.error("[GATEWAY] Downstream service error", {
        userStatus: userRes.status,
        orderStatus: orderRes.status
      });

      return res.status(502).json({
        error: "Downstream service failed",
        userStatus: userRes.status,
        orderStatus: orderRes.status
      });
    }

    const user = await userRes.json();
    const orders = await orderRes.json();

    const durationMs = Date.now() - startTime;
    console.log("[GATEWAY] Request completed", {
      durationMs
    });

    return res.status(200).json({ user, orders });
  } catch (err) {
    const durationMs = Date.now() - startTime;

    // AbortController throws a DOMException on timeout
    if (err.name === "AbortError") {
      console.error("[GATEWAY] Downstream timeout", {
        durationMs
      });

      return res.status(504).json({
        error: "Downstream service timeout",
        timeoutMs: DEFAULT_TIMEOUT_MS
      });
    }

    console.error("[GATEWAY] Unhandled exception", {
      message: err.message
    });

    return res.status(500).json({
      error: "Gateway exception",
      message: err.message
    });
  }
};
