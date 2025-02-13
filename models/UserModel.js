import mongoose from "mongoose";

// Define the schema for the User
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    cartdata: { type: Object, default: {} }   
}, { minimize: false }); 
// Create the model
const userModel = mongoose.model('User', UserSchema);

export default userModel;
 