import express from "express";
import { User } from "../models/user_modes.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.get('/', (req, res) => {
    res.send('welcome to home server site page');
})

// signup API
authRouter.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            res.status(200).json({ msg: "please fill the the field" });
        }
        if (!email.includes("@")) {
            res.status(200).json({ msg: "please enter the valid email" });
        }
        const uniqueUser = await User.findOne({ email });
        if (uniqueUser) {
            res.status(200).json({ msg: "please enter the unique email" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newuser = await User({
            username,
            email,
            password: hashPassword
        })
        newuser.save();
        console.log(newuser);
        res.status(200).json({ msg: "signup successfully" });
    } catch (error) {
        console.log('Inetrnal Server Error');
        res.send("Internal server error");
    }
})

// login API
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(200).json({ msg: "please fill the the field" });
        }
        if (!email.includes("@")) {
            res.status(200).json({ msg: "please enter the valid email" });
        }
        const uniqueUser = await User.findOne({ email });
        if (!uniqueUser) {
            res.status(200).json({ msg: "User not Found" });
        }

        const doMatch = await bcrypt.compare(password, uniqueUser.password)
        if (doMatch) {
            const token = jwt.sign({ userId: uniqueUser.id }, process.env.JWT_SECRET, {
                expiresIn: "7d"
            })
            res.status(201).json({ token });
        } else {
            res.status(200).json({ msg: "Email Or password do not match" });
        }
        res.status(200).json({ msg: "login successfully" });
    } catch (error) {
        console.log('Inetrnal Server Error');
        res.send("Internal server error");
    }
})



export default authRouter;