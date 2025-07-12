import express from "express"
import  { gettherequests, senderreq, updaterequest } from "../controllers/Requestcontroller.js"
import { auhtmiddleware } from "../Middleware/auth.js";


const RequestRouter = express.Router();


RequestRouter.post("/postrequest",auhtmiddleware,senderreq);
RequestRouter.get("/getrequests",auhtmiddleware,gettherequests);
RequestRouter.post("/updatereq",auhtmiddleware,updaterequest);

export default RequestRouter;