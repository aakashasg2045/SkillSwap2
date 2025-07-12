import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export async function dbconnect(){
    try {
        const db =await mongoose.connect("mongodb+srv://nithinchowdarydavuluri05:cCk05L0lkmZhPIFj@cluster0.hvor1xo.mongodb.net/");
        console.log("db is connected");
    } catch (error) {
        console.log(error);
    }
}