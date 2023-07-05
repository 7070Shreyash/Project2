import Ques from "../models/Ques";
import User from "../models/User";

// create 

export const createQues = async(req,res) => {
    try {
        const {userId} = req.params;
        const {description , picturePath } = req.body;
        const user = await User.findById(userId) ;

        const newQues = new Ques({
            userId ,
            firstName : user.firstName,
            lastName : user.lastName,
            description ,
            picturePath,
            userPicturePath : user.picturePath,
            upVote : {},
            downVote : {},
            answers : []
        });
        user.questionAsked++;
        await newQues.save() ;
        
        const updatedUser = await User.findByIdAndUpdate(
            userId ,
            {questionAsked : user.questionAsked}, 
            {new : true}

        );
        const ques = await Ques.find() ;
        res.status(201).json({ques , updatedUser});
    } catch (err) {
        res.status(409).json({message : err.message}) ;
    }
};

export const getFeedQues = async (req,res) => {
    try {
        const ques = await Ques.find();
        res.status(200).json(ques);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserQues = async (req,res) => {
    try {
        const {userId} = req.params;
        const ques = await Ques.find({userId}) ;
        res.status(200).json(ques) ;
    } catch (err) {
        res.status(404).json({message : err.message}) ;
    }
}


export const upVote = async (req,res) => {
    try {
        const { quesId } = req.params ;
        const { userId } = req.body;

        const ques = await Ques.findById(quesId) ;

        const isUpVoted = ques.upVote.get(userId) ;

        if(isUpVoted) {
            ques.upVote.delete(userId);
        } else {
            ques.upVote.set(userId,true);
        }

        const updatedQues = await Ques.findByIdAndUpdate(
            quesId,
            {upVote : ques.upVote} ,
            {new : true}
        ) ;

        res.status(200).json(updatedQues);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


export const downVote = async (req,res) => {
    try {
        const { quesId } = req.params ;
        const { userId } = req.body;

        const ques = await Ques.findById(quesId) ;

        const isDownVoted = ques.downVote.get(userId) ;

        if(isDownVoted) {
            ques.downVote.delete(userId);
        } else {
            ques.downVote.set(userId,true);
        }

        const updatedQues = await Ques.findByIdAndUpdate(
            quesId,
            {downVote : ques.downVote} ,
            {new : true}
        ) ;

        res.status(200).json(updatedQues);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


export const ansQues = async(req,res) => {
    try {
        const { userId , answer } = req.body ;
        const { quesId } = req.params;
        const ques = await Ques.findById(quesId) ;
        const user = await User.findById(userId) ;

        if(!ques) {
            return res.status(400).json({message : "Ques does not exists"}) ;
        }

        if(!user) {
            return res.status(400).json({message : "User does not exists"}) ;
        }

        // checking the ans of that user 

        ques.answers.push(answer) ;
        user.questionAnswered++;

        const updatedQues = await Ques.findByIdAndUpdate(
            quesId ,
            {answers : ques.answers} ,
            {new : true}
        )

        const updatedUser = await User.findByIdAndUpdate(
            userId ,
            {questionAnswered : user.questionAnswered} ,
            {new : true}
        )
        res.status(200).json({updatedQues , updatedUser}) ;
        
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};