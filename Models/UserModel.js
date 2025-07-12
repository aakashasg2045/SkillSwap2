import mongoose from "mongoose";
import RequestModel from "./RequestModel.js";

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    skills_offered:{
        type:Array,
        default:[]
    }
    ,
    skill_wanted:{
        type:Array,
        default:[]
    },
    Availability:{
        type:Array,
        default:[]
    },
    profile_type:{
        type:String,
        default:"private"
    },
    Image_of_user:{
        type:String,
    },
    location:{
        type:String
    },
    Rating:{
        type:Number,
        default:0
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}) 
UserSchema.virtual('requestsByRequestedUser', {
  ref: 'Request',
  localField: '_id',
  foreignField: 'submit_user',
});

UserSchema.virtual('requestsByRequiredUser', {
  ref: 'Request',
  localField: '_id',
  foreignField: 'other_user',
});

const userModel = mongoose.models.User || mongoose.model("User",UserSchema);
export default userModel;