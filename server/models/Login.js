import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
  f_userName: { type: String, required: true, unique: true },
  f_Pwd: { type: String, required: true },
});

export default mongoose.model("Login", LoginSchema);
