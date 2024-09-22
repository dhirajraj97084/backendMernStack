import express from "express";

const app=express();
const port= process.env.PORT || 3400;

app.get("/", (req,res)=>{
   res.send("welcome to server site appication")
})

app.listen(port,()=>{
    console.log(`your application run succefully http://localhost:${port}`)
})