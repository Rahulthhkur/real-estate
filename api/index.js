import express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from "cookie-parser";
import listingRouter from './routes/lisiting.route.js';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDb');
})
.catch((err) => {
    console.log('err');
});

const app= express();

const _dirname = path.resolve();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
}
);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err,req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });    
});
