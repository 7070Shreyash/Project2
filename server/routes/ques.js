import express from "express";
import { getFeedQues , getUserQues , upVote , downVote , createQues ,ansQues} from "..controllers/ques.js" ;
import { verifyToken } from "../middlewares/auth";

const router = express.Router() ;

router.get("/",verifyToken,getFeedQues) ;

router.get("/:userId/ques",verifyToken,getUserQues) ;

router.patch("/:id/upvote",verifyToken,upVote) ;

router.patch("/:id/downvote",verifyToken,downVote);

router.post("/",verifyToken,createQues);

router.post("/:id/answer",verifyToken,ansQues);

export default router ;