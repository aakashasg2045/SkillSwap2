import mongoose from "mongoose";
const Requestschema = mongoose.Schema({
    skill_wanted:{
        type:String,
        required:true
    },
    skill_offered:{
        type:String,
        required:true
    },
    message:{
        type:String,
        default:''
    },
    status:{
        type:String,
        default:"pending"
    },
    other_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    submit_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})



const RequestModel = mongoose.models.Request || mongoose.model("Request",Requestschema);
export default RequestModel;