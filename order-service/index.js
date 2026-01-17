// Order Service (local dev only)
// ------------------------------
// This intentionally mirrors the user service so the setup stays predictable.
// Express is used here for local development.
// On Vercel, this would be replaced with a serverless function.

const express = require("express");
const app = express();

app.get("/orders/:userId", (req, res) => {
  // In a real system this would come from a database.
  // For demo purposes, we return static data tied to the user ID.
  res.json([
    { id: 1, item: "Keyboard", userId: req.params.userId },
    { id: 2, item: "Mouse", userId: req.params.userId }
  ]);
});

// LOCAL ONLY:
// Vercel doesn’t run long-lived Express servers.
// This service exists purely for local development and testing.
// When deployed, this logic would live under /api/orders as a serverless route.
app.listen(3002, () => {
  console.log("Order service running on port 3002 (local dev)");
});
