import { User } from '../db/userModel.js';
import crypto from "crypto";
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { saveObj } from '../config/objectHandler.js';
import { tipoObjeto } from '../config/constants.js';
import { cognitoConfig } from "../config/credentials.js";

const cognito = new CognitoUserPool(cognitoConfig);


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

export const getUser = async (req, res) => {
    try{
        const { id } = req.params;

        const dataUser = await User.findOne({ _id:id }, { __v: 0, password: 0, idImage: 0 });

        res.response(dataUser);

    } catch (error) {
        res.response(null, error.message, 400);
    }
};

export const declineRequest = async (req, res) => {
    try{
        const { idFriend } = req.params;
        const { user:email } = req;

        const friend = await User.findOne({ _id: idFriend }, { __v: 0, password: 0, idImage: 0 });

        if (!friend) {
            return res.response(null, "User not found", 400);
        }
        
        // quitar las solicitudes pendientes y solicitudes recibidas
        User.updateOne({ email }, { $pull: { friendRequests: friend._id } }).exec();

        res.response(null, "Request rejected");

    } catch (error) {
        res.response(null, error.message, 400);
    }
}

export const updateInfoUser = async (req, res) => {
    
    try
    {
        const { name, lastName, dpi, password } = req.body;
        const { user:email } = req;

        const userLogged = await User.findOne({ email }, { password: 1 });

        const hash = crypto.createHash('sha256').update(password).digest('hex') + "s3m1s0c1a1**";

        if (userLogged.password !== hash) {
            return res.response(null, "Password incorrect", 400);
        }

        const authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: hash
        });

        const userData = {
            Username: email,
            Pool: cognito
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: async (result) => {
                const attributeList = [];
                attributeList.push(new CognitoUserAttribute(
                    {
                        Name: "name",
                        Value: `${name} ${lastName}`
                    }
                ));

                attributeList.push(new CognitoUserAttribute(
                    {
                        Name: "custom:dpi",
                        Value: dpi
                    }
                ));

                cognitoUser.updateAttributes(attributeList, (err, result) => {
                    if (err) {
                        return res.response(null, err.message, 400);
                    } else {
                        cognitoUser.signOut();
                        User.updateOne({ email }, { name, lastName, dpi }).exec();
                        return res.response(null, "User updated", 200);
                    }
                });
            },
            onFailure: (err) => {
                console.log('aca');
                res.response(null, err.message, 403);
            }
        });
    } catch (error) {
        console.log(error);
        res.response(null, error.message, 400);
    }

}

export const updateImageUser = async (req, res) => {
    try {
        const { user:email } = req;
        const { buffer, originalname } = req.file;
        const { password } = req.body;
        const fileExtension = originalname.split('.').pop();

        const userLogged = await User.findOne({ email }, { password: 1 });

        const hash = crypto.createHash('sha256').update(password).digest('hex') + "s3m1s0c1a1**";

        if (userLogged.password !== hash) {
            return res.response(null, "Password incorrect", 400);
        }

        const { Key, Location } = await saveObj(buffer, fileExtension, tipoObjeto.IMG);

        User.updateOne({ email }, { pathImage: Location, idImage: Key }).exec();

        res.response({ pathImage: Location }, "Image updated", 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 400);
    }
}