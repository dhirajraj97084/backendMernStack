import express from "express";
import databaseConnection from "./database/Db.js";
import authRouter from "./router/auth_router.js";
import dotenv from 'dotenv'

const app=express();
const port= process.env.PORT || 3400;
databaseConnection();
dotenv.config()

app.use(express.json());
app.use('/api/auth',authRouter);

app.listen(port,()=>{
    console.log(`your application run succefully http://localhost:${port}`)
})