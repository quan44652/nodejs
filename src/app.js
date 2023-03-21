import express from "express";
import mongoose from "mongoose";
import routerProduct from "./routes/product";

const app = express();
app.use(express.json());

// Connect to DB
mongoose.connect("mongodb://127.0.0.1:27017/nodejs");

app.use("/api", routerProduct);

export const viteNodeApp = app;
