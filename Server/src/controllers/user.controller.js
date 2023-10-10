import { User } from '../db/userModel.js';
import { saveObj } from '../config/objectHandler.js';
import { tipoObjeto } from '../config/constants.js';

export const getUsers = async (req, res) => {
    try {
        // const users = await User.find({}, { __v: 0, password: 0, friends: 0, friendRequests: 0, idImage: 0 });
        const { user:email } = req;

        const userLogged = await User.findOne({ email }, { __v: 0, password: 0, idImage: 0 });

        const users = await User.find({ email: { $ne: email } }, { __v: 0, password: 0, friendRequests: 0, idImage: 0, friends: 0, requests: 0 });

        const usersModify = users.map(user => {
            const isFriend = userLogged.friends.includes(user._id);
            // requests: solicitudes enviadas
            const isRequestPending = userLogged.requests.includes(user._id);
            // friendRequests: solicitudes recibidas
            const isPendigResponseRequest = userLogged.friendRequests.includes(user._id);
            return { ...user.toObject(), isFriend, isRequestPending, isPendigResponseRequest };
        });

        res.response(usersModify);
    } catch (error) {
        res.response(null, error.message, 400);
    }
};

export const createRequest = async (req, res) => {
    try {
        const { idFriend } = req.params;
        const { user:email } = req;

        const dataUser = await User.findOne({ email }, { __v: 0, password: 0, idImage: 0 });

        const friend = await User.findOne({ _id: idFriend }, { __v: 0, password: 0, idImage: 0 });

        if (!friend) {
            return res.response(null, "User not found", 400);
        }

        User.updateOne({ email }, { $push: { requests: friend._id } }).exec();
        User.updateOne({ _id: friend._id }, { $push: { friendRequests: dataUser._id } }).exec();

        res.response(null, "Request sent");

    } catch (error) {
        res.response(null, error.message, 400);
    }
}

export const acceptRequest = async (req, res) => {
    try{
        const { idFriend } = req.params;
        const { user:email } = req;

        const dataUser = await User.findOne({ email }, { __v: 0, password: 0, idImage: 0 });

        const friend = await User.findOne({ _id: idFriend }, { __v: 0, password: 0, idImage: 0 });

        if (!friend) {
            return res.response(null, "User not found", 400);
        }

        User.updateOne({ email }, { $push: { friends: friend._id } }).exec();
        User.updateOne({ _id: friend._id }, { $push: { friends: dataUser._id } }).exec();
        
        // quitar las solicitudes pendientes y solicitudes recibidas
        User.updateOne({ email }, { $pull: { friendRequests: friend._id } }).exec();
        User.updateOne({ _id: friend._id }, { $pull: { requests: dataUser._id } }).exec();

        res.response(null, "Request accepted");

    } catch (error) {
        res.response(null, error.message, 400);
    }
}