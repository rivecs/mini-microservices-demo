/**
 * User Service – Vercel Serverless Function
 * ----------------------------------------
 * This file defines the ONLY public endpoint for the user service.
 *
 * On Vercel:
 * - Files inside /api become HTTP routes
 * - This file maps directly to:
 *     GET /api/users
 *
 * Important differences from Express:
 * - There is NO app.listen()
 * - There is NO router
 * - This function is invoked per-request
 *
 * If this file does not exist at exactly:
 *   /api/users.js
 * Vercel will return a 404 forever and never explain why.
 */

module.exports = (req, res) => {
  // Vercel passes query params via req.query
  // Example request:
  //   /api/users?id=123
  const { id } = req.query;

  // Keep the response boring and predictable.
  // This is a demo service, not a database-backed one.
  res.status(200).json({
    id: String(id || ""),
    name: "Jane Doe",
    email: "jane@example.com"
  });
};