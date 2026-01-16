const express = require("express");
const app = express();

app.get("/users/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: "Chris Rivers",
    email: "chris.rivers@example.com"
  });
});

app.listen(3001, () => {
  console.log("User service running on port 3001");
});
