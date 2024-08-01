import mongoose from "mongoose";

const schema = new mongoose.schema({
    email:{
        type: String,
        required: true,
        unique:true ,
    }
    
},{
    timeStamps: true,
})

export const User = mongoose.model('User',schema);