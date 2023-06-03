import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode : "light" ,
    user : null ,
    token : null ,
    ques : [] ,
};

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setMode : (state) => {
            state.mode = state.mode === "light" ? "dark" : "light" ; 
        } ,

        setLogin : (state , action) => {
            state.user = action.payload.user ;
            state.token = action.payload.token ;
        } ,

        setLogout : (state) => {
            state.user = null ;
            state.token = null ;
        } ,

        setQues : (state , action) => {
            state.ques = action.payload.ques ;
        } ,

        setQue : (state , action) => {
            const updatedQues = state.ques.map(
                (ques) => {
                    if(ques._id == action.payload.ques._id) return action.payload.post;
                    return post;
                }
            );
            state.ques = updatedQues;
        } ,
    } ,
});

export const {setMode , setLogin , setLogout ,setQue , setQues} = authSlice.actions;

export default authSlice.reducer;