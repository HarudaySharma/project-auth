import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to the db");
  })
  .catch((msg) => {
    console.log(msg);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is listening on port:3000");

});

//to create an api route

app.use("/backend/user/", userRoutes);
