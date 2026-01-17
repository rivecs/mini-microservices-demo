/**
 * API Gateway – Vercel serverless function
 *
 * This endpoint aggregates data from:
 * - User service
 * - Order service
 *
 * Endpoint:
 *   GET /api/profile?id=123
 *
 * Required environment variables (set in Vercel):
 *   USER_SERVICE_URL
 *   ORDER_SERVICE_URL
 */

module.exports = async (req, res) => {
  const { id } = req.query;

  const userBase = process.env.USER_SERVICE_URL;
  const orderBase = process.env.ORDER_SERVICE_URL;

  // Fail loudly and clearly if env vars are missing
  if (!userBase || !orderBase) {
    return res.status(500).json({
      error: "Missing environment variables",
      required: ["USER_SERVICE_URL", "ORDER_SERVICE_URL"]
    });
  }

  try {
    const userRes = await fetch(
      `${userBase}/api/users?id=${encodeURIComponent(id)}`
    );

    const orderRes = await fetch(
      `${orderBase}/api/orders?userId=${encodeURIComponent(id)}`
    );

    if (!userRes.ok || !orderRes.ok) {
      return res.status(502).json({
        error: "Downstream service failed",
        userStatus: userRes.status,
        orderStatus: orderRes.status
      });
    }

    const user = await userRes.json();
    const orders = await orderRes.json();

    return res.status(200).json({ user, orders });
  } catch (err) {
    return res.status(500).json({
      error: "Gateway exception",
      message: err.message
    });
  }
};
