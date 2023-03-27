import mongoose from "mongoose";

/*
for creating fields mongoose.Schema is used and in the array or struct , provide field name and its type
    required means it should have some input
    unique means username of two users shouldn't same
*/
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      },
    
      password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
      },
    })
    
    export default mongoose.model.users || mongoose.model("users", userSchema);