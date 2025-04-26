// const express = require("express");
import express from "express";
import mainRouter from "./routes/index";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1",mainRouter);

app.listen(3000,()=>{
    console.log("your server is live on http://localhost:3000");
})