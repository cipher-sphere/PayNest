// const express = require("express");
import express from "express";
import mainRouter from "./routes/index";
const app = express();

app.use("/api/v1",mainRouter);