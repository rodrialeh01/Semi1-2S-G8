import { Schema, model, mongoose } from 'mongoose';

const publicationSchema = new Schema(
    {
        pathImage: String,
        idImage: String,
        description: String,
        idUser: mongoose.Types.ObjectId,
        comments: Array
    },
    {
        timestamps: true
    }
);

export const Publication = model('publications', publicationSchema);