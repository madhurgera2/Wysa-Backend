import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  photoUrl: { type: String, optional: true },
},{
  timestamps:true
});


const userModel = mongoose.model('user', userSchema)



export default userModel;
