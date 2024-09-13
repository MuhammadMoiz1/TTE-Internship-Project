import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
  });


const Admin= mongoose.model('admins', userSchema);

export default Admin;