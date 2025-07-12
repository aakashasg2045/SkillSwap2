import userModel from "../Models/UserModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

const createjwt = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//login user
export const loginuser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"user doesnot exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"password does not match"});
        }
        const token = createjwt(user._id);
        res.cookie("token", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const data = await userModel.findById(user._id);
        res.json({success:true,token,data});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//register user
export const registeruser = async(req,res)=>{
    const {name,password,email} = req.body;
    try {
        //check is user already exists
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:"user already exists"})
        }
        //validiting email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"invalid user id"})
        }
        if(password.length < 8){
            return res.json({success:false,message:"please enter a strong password"})
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);

        const newuser = userModel.create({
            name:name,
            email:email,
            password:hashedpassword
        })
        const token = createjwt(newuser._id)
        res.cookie("token", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//update the user from the profile page
export const UserUpdate = async(req,res)=>{
    const {name,location,skills_offered,skill_wanted,Availability,profile_type} = req.body;
    const userId = req.userId;
    try {
        const update = await userModel.findByIdAndUpdate(userId,{Image_of_user:req.file.filename,name,location,skills_offered,skill_wanted,Availability,profile_type},{ new: true });
        if (!update) {return res.status(404).json({ success: false, message: "User not found" });
    }
        res.json({success:true,message:"successfully updated the data"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

export const getallusers = async(req,res)=>{
    try {
        const allWantedSkills = await userModel.distinct('skill_wanted');

        const users = await userModel.find({skill_wanted: { $in: allWantedSkills }});
        res.json({success:true,message:users});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export const getoneuser = async(req,res)=>{
    const {newuserid} = req.body;
    try {
        const user = await userModel.findById(newuserid);
        res.json({success:true,message:user});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}