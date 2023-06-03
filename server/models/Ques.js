import mongoose from "mongoose";

const quesSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    description: String,
    picturePath: {
        type : String ,
        default : ""
    } ,
    userPicturePath: {
        type : String ,
        default : ""
    } ,
    upVote: {
        type: Map,
        of: Boolean,
    },
    downVote: {
        type: Map,
        of: Boolean,
      },
    answers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Ques = mongoose.model("Ques", quesSchema);

export default Ques;
