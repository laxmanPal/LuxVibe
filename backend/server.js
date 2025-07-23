import express from "express";

// APP
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`MongoDB connected\nApp running on http://localhost:${PORT}`);
});
