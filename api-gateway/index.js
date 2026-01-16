const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/profile/:id", async (req, res) => {
  const userRes = await fetch(`http://localhost:3001/users/${req.params.id}`);
  const orderRes = await fetch(`http://localhost:3002/orders/${req.params.id}`);

  const user = await userRes.json();
  const orders = await orderRes.json();

  res.json({ user, orders });
});

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
