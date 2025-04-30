// const express = require("express");
import express from "express";
import cors from "cors";
app.use(cors());
app.use(express.json());
import mainRouter from "./routes/index";
const app = express();
app.use("/api/v1",mainRouter);

app.listen(3000,()=>{
    console.log("your server is live on http://localhost:3000");
})