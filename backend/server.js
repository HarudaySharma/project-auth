import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

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

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is listening on port:3000");

});

//to create an api route

app.use("/backend/user/", userRoutes);
app.use("/backend/auth", authRoutes);


// middleware to handle errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Server Error";

    return res.status(statusCode).json({
        success: false,
        message: message,
        statusCode: statusCode
    })
} )