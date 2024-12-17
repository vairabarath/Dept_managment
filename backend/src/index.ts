// src/index.ts
import express from "express";
import cors from "cors";
import listRoutes from "./routers/listRoutes";

const app = express();

app.use(cors());

app.use("/data", listRoutes);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
