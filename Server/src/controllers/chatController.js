import { chatModel } from "../db/chatModel.js";

export const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        });

        if (chat) return res.response(chat);

        const newChat = new chatModel({
            members: [firstId, secondId]
        });

        const response = await newChat.save();

        res.response(response);

    } catch (error) {
        console.log(error);
        res.response(null,error.message, 500);
    }
};

export const findUsersChats = async (req, res) => {
    const { userId } = req.params;

    try {
        const chats = await chatModel.find({
            members: { $in: [userId] }
        });

        res.response(chats);

    } catch (error) {
        console.log(error);
        res.response(error);
    }
};

export const findChat = async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        const chat = await chatModel.find({
            members: { $all: [firstId, secondId] }
        });

        res.response(chat);

    } catch (error) {
        console.log(error);
        res.response(error);
    }
};