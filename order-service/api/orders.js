/**
 * Order Service – Vercel Serverless Function
 * -----------------------------------------
 * This service intentionally does ONE thing:
 * return orders for a given user ID.
 *
 * Route:
 *   GET /api/orders?userId=123
 *
 * Notes for future-you:
 * - This is not Express
 * - There is no server process
 * - Each request spins up this function independently
 *
 * If you hit:
 *   /
 * or:
 *   /api
 * you will get a 404. That is expected.
 */

module.exports = (req, res) => {
  // Query param naming is explicit to avoid ambiguity
  const { userId } = req.query;

  // Fake data, on purpose.
  // The point here is service boundaries, not persistence.
  res.status(200).json([
    {
      id: 1,
      item: "Keyboard",
      userId: String(userId || "")
    },
    {
      id: 2,
      item: "Mouse",
      userId: String(userId || "")
    }
  ]);
};
