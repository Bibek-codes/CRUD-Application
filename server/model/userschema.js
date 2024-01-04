import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  gender: String,
  heardAbout: { type: String, enum: ['LinkedIn', 'Friends', 'Job Portal', 'Others'] },
  city: String,
  state: String,
});

const Alluser = mongoose.model('Alluser', userSchema);

export default Alluser;