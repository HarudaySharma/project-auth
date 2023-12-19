import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import path from 'path';

dotenv.config();
mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("connected to the db");
    })
    .catch((err) => {
        console.log(err);
    });


const __dirname = path.resolve();

const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

//a built-in middleware function.based on body-parser. 
app.use(express.json());

app.use(cookieParser());

app.listen(PORT, () => {
    console.log("Server is listening on port:3000");

});

//creating api routes for different endpoints
app.use("/backend/user/", userRoutes);
app.use("/backend/auth/", authRoutes);

// middleware to handle errors
app.use((err, req, res) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Server Error";

    return res.status(statusCode).json({
        success: false,
        message: message,
        statusCode: statusCode
    })
})