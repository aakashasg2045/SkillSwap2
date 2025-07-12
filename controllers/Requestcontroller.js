import RequestModel from "../Models/RequestModel.js";

export const senderreq = async(req,res)=>{
    const {skill_wanted,skill_offered,message,other_user} = req.body;
    const submit_user = req.userId;
    try {
        const requests = await RequestModel.create({
        skill_wanted,skill_offered,message,other_user,submit_user
        });
        res.json({message:"success",message:"successfully set request"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export const gettherequests = async (req, res) => {
  const submit_user = req.userId;
    console.log(submit_user)
  try {
    const user = await RequestModel.find({submit_user})
      .populate('submit_user')   
     .populate('other_user');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updaterequest = async(req,res)=>{
    const {status} = req.body;
    const submit_user = req.userId;
    try {
        const updatereq = await RequestModel.findOneAndUpdate({submit_user},{status});
        res.json({sussess:true,message:"successfully updated!"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}