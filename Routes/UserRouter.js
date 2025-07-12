import express from "express"
import multer from "multer";

import { auhtmiddleware } from "../Middleware/auth.js";
import { getallusers, getoneuser, loginuser, registeruser, UserUpdate } from "../controllers/Usercontroller.js";


const UserRouter = express.Router();

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        const parts = file.mimetype.split("/");
        return cb(null,`${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})
const upload = multer({storage:storage})

UserRouter.post("/login",loginuser);
UserRouter.post("/register",registeruser);
UserRouter.post("/updateUser",auhtmiddleware,upload.single("Image_of_user"),UserUpdate);
UserRouter.get("/getoneuser",getoneuser);
UserRouter.get("/getallusers",getallusers);

export default UserRouter;