const express = require("express");
const app = express();

app.get("/orders/:userId", (req, res) => {
  res.json([
    { id: 1, item: "Keyboard", userId: req.params.userId },
    { id: 2, item: "Mouse", userId: req.params.userId }
  ]);
});

app.listen(3002, () => {
  console.log("Order service running on port 3002");
});
