// User Service (local dev only)
// -----------------------------
// This version runs as a plain Express server for local development.
// It’s intentionally simple and mirrors how the service would behave in production.
//
// Important note:
// Vercel does not support long-running servers like this.
// To deploy there, this logic would move to /api/users
// and export a request handler instead of calling app.listen().

const express = require("express");
const app = express();

app.get("/users/:id", (req, res) => {
  // Static response for demo purposes.
  // In a real system this would come from a database or external service.
  res.json({
    id: req.params.id,
    name: "Jane Doe",
    email: "jane@example.com"
  });
});

// LOCAL ONLY:
// This listener exists purely for local development and testing.
// When deployed to Vercel, the server lifecycle is handled for you.
app.listen(3001, () => {
  console.log("User service running on port 3001 (local dev)");
});
