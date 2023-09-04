import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    clerkId: {type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true},
    name: { type: String, required: true},
    bio: String,
    onboarded: { type: Boolean, default: false},
    org:{ type:mongoose.Schema.Types.ObjectId, ref: 'Org'}

});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;