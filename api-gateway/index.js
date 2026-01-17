// API Gateway (local dev version)
// -------------------------------
// This gateway aggregates data from the user-service and order-service.
// Locally, we talk to hardcoded localhost ports.
// On Vercel, these MUST be replaced with environment variables.

const express = require("express");
const fetch = require("node-fetch");

const app = express();

// This endpoint acts as a lightweight API gateway.
// It pulls data from multiple backend services and combines
// the response into something the frontend actually wants.
app.get("/profile/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // These calls are independent, so we run them in parallel
    // instead of waiting on one before starting the other.
    const [userRes, orderRes] = await Promise.all([
      fetch(`http://localhost:3001/users/${id}`),
      fetch(`http://localhost:3002/orders/${id}`)
    ]);

    // If either upstream service fails, we bail early.
    // The gateway shouldn’t pretend everything is fine
    // when a dependency is having a bad day.
    if (!userRes.ok || !orderRes.ok) {
      return res.status(502).json({
        error: "One or more upstream services failed"
      });
    }

    // Parse both responses once we know they’re valid
    const user = await userRes.json();
    const orders = await orderRes.json();

    // Return a single, frontend-friendly payload
    res.json({ user, orders });
  } catch (err) {
    // Catch network errors, JSON parsing issues, etc.
    // In a real system this would be logged centrally.
    console.error("Error aggregating profile data:", err);

    res.status(500).json({
      error: "Unexpected error while loading profile data"
    });
  }
});

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
