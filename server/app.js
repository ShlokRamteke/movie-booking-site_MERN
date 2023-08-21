import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import movieRouter from "./routes/movie-routes";
import bookingsRouter from "./routes/booking-routes";
import cors from "cors";
dotenv.config();

const port = 8000;
const app = express();
const db = process.env.DATABASE;

//middlewares
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

mongoose
  .connect(db)
  .then(() =>
    app.listen(port, () => {
      console.log(`Connected to Database and server is running at ${port}`);
    })
  )
  .catch((error) => console.log(error));
