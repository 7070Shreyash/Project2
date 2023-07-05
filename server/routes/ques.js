import express from "express";
import { getFeedQues , getUserQues , upVote , downVote , createQues ,ansQues} from "..controllers/ques.js" ;
import { verifyToken } from "../middlewares/auth";

const router = express.Router() ;

router.get("/",verifyToken,getFeedQues) ;

router.get("/:userId",verifyToken,getUserQues);

router.patch("/:quesId/upvote",verifyToken,upVote);

router.patch("/:quesId/downvote",verifyToken,downVote);

router.post("/:userId",verifyToken,createQues);

router.post("/:quesId/answer",verifyToken,ansQues);

export default router ;