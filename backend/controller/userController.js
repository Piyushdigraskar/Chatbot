import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';

export const loginUser = async(req, res)=>{
    try {
        const {email} = req.body;

        let user = await User.findOne({email});
        
        if(!user){
            user = await User.create({
                email,
            })
        }
        

        const otp = Math.floor(Math.random() * 1000000);

        const verifyToken = 
    } catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }
}