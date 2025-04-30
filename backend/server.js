import express from "express";
import cors from "cors";
import mainRouter from "./routes/index.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", mainRouter);

// Start server
app.listen(3000, () => {
    console.log("Your server is live on http://localhost:3000");
});