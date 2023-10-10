import { Schema, model } from 'mongoose';
// import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    dpi: String,
    password: String,
    pathImage: String,
    idImage: String,
    friends: Array,
    requests: Array,
    friendRequests: Array
});

// userSchema.methods.encryptPassword = async (password) => {
//     const salt = await bcrypt.genSalt(5);
//     return bcrypt.hash(password, salt);
// };

// userSchema.methods.validatePassword = function (password) {
//     return bcrypt.compare(password, this.password);
// };

export const User = model('users', userSchema);