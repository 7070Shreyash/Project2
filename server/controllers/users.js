import User from "../models/User";

// read 

export const getUser = async(req,res) => {
    try {
        const { id } = req.body;
        const user = User.findById(id) ;
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message : err.message}) ;
    }
};

