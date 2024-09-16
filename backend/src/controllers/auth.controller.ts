import { Request,Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'

//endpoint de login , controlador para logiarce
export const login= async(req:Request,res:Response)=>{
    const {username, password}=req.body;
    const user=await User.findOne({where:{username}});
    if(!user|| !(await user.compararPass(password))){
        return res.status(400).json({message:'Credenciales inválidas'});
    }
    const token= jwt.sign({id:user.id, role:user.role}, process.env.JWT_SECRET as string,{expiresIn:'1h'})
    res.json({token});
}

//endpint para registrar un usuario 
export const register = async(req:Request,res:Response)=>{
    const {username,password,role}= req.body;
    const hashedPassword= await bcrypt.hash(password,10);
    const user = await User.create({username,password:hashedPassword,role});
    res.json(user);
}