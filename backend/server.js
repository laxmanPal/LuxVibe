import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"



// Dotenv Config
import 'dotenv/config'

// APP
const app = express();

// PORT
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth Routes
app.use("/auth", authRoutes );

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MongoDB connected\nApp running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
