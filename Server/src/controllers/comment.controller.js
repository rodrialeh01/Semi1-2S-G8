import { Publication } from '../db/publicationModel.js';
import { User } from '../db/userModel.js';
import { Comment } from '../db/commentModel.js';

export const createComment = async (req, res) => {
    try{
        const { comment, idPublication } = req.body;
        const { user:email } = req;

        const userLogged = await User.findOne({ email }, { __v: 0, password: 0, idImage: 0 });

        const publication = await Publication.findById(idPublication);
        if(!publication) return res.response(null, 'Publication not found', 404);

        Comment.create({
            comment,
            idUser: userLogged._id,
            nameUser: userLogged.name,
            lasNameUser: userLogged.lastName,
            pahtImageUser: userLogged.pathImage,
            idPublication: publication._id
        });

        res.response(null, 'Comentario creado correctamente', 200);
    } catch (error) {
        res.response(null, err.message, 400);
    }
}

export const getCommentsByPublication = async (req, res) => {
    try {
        const { idPublication } = req.params;

        const publication = await Publication.findById(idPublication);
        if(!publication) return res.response(null, 'Publication not found', 404);

        const comments = await Comment.find({ idPublication }, { __v: 0 });

        comments.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        res.response(comments);
    } catch (error) {
        res.response(null, err.message, 400);
    }
}