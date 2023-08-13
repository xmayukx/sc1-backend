import express, { Application, Request, Response } from "express";
import router from "./routes";
const app: Application = express();
const PORT: number = 3001;
require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.DATABASE_URL;
app.use(router)
const run = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB!");
  });
};

run();

app.use("/", (req: Request, res: Response): void => {
  res.send("Hello world!");
});

app.listen(PORT, (): void => {
  console.log("SERVER IS UP ON PORT:", PORT);
});
