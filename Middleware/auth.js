import jwt from "jsonwebtoken"


export const auhtmiddleware = async(req,res,next)=>{
    const token =req.cookies.token;
    
    try {
        if(!token)res.send({"success":false,"message":"you are not logged in "});
        const checkid = jwt.verify(token,process.env.JWT_SECRET);
        if(!checkid)res.send({"success":false,"message":"the token is invalid"});
        req.userId = checkid.id;
        next();
    } catch (error) {
        res.send({"success":false,"message":"you are not authorised"});
    }
}