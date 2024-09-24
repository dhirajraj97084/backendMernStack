//import "dotenv/config"
import jwt from "jsonwebtoken";

const fetchUsert=(req,res,next)=>{
   const token=req.header('auth-token');
   if (!token) {
     res.status(200).send("please authanticate using valid token");
   }
   try {
    const {userId}=jwt.verify(token,process.env.JWT_SECRET);
    req.userId=userId;
    console.log("fetchuser:",userId);
    next();
   } catch (error) {
    res.status(500).json("internal server error");
   }
}

export default fetchUsert;