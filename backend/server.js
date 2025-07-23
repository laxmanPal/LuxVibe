import express from "express";
import mongoose from "mongoose";
// Dotenv Config
import 'dotenv/config'

// APP
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MongoDB connected\nApp running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
