import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from 'cors'

dotenv.config();
mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("connected to the db");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
const PORT = 3000;

//a built-in middleware function.based on body-parser. 
app.use(express.json());

app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: `${process.env.WEB_CLIENT_URL}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Include allowed headers
}));

// middleware to handle preflight requests
app.options('*', cors({
    credentials: true,
    origin: `${process.env.WEB_CLIENT_URL}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.listen(PORT, () => {
    console.log("Server is listening on port:3000");

});

app.get("/", (_, res) => {
    res.json({status: "server running"});
})

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
