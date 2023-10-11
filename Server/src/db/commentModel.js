import mongoose, { Schema, model } from 'mongoose';

const commentSchema = new Schema(
    {
        comment: String,
        idUser: mongoose.Types.ObjectId,
        nameUser: String,
        lasNameUser: String,
        pahtImageUser: String,
        idPublication: mongoose.Types.ObjectId
    },
    {
        timestamps: true
    }
);

export const Comment = model('comments', commentSchema);