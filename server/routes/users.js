import express from "express" ;
import { getUser } from "../controllers/users.js" ;
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router() ;

//read 

router.get("/:id",verifyToken,getUser) ;

export default router ;