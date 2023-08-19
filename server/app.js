import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const port = 5000;
const app = express();
const db = process.env.DATABASE;

mongoose
  .connect(db)
  .then(() =>
    app.listen(port, () => {
      console.log(`Connected to Database and server is running at ${port}`);
    })
  )
  .catch((error) => console.log(error));
