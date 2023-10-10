import mongoose, { Schema, model } from 'mongoose';

const publicationSchema = new Schema(
    {
        pathImage: String,
        idImage: String,
        description: String,
        idUser: mongoose.Types.ObjectId,
        labels: Array
    },
    {
        timestamps: true
    }
);

export const Publication = model('publications', publicationSchema);