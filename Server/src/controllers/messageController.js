import { messageModel } from "../db/messageModel.js";

export const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;

    const message = new messageModel({ 
        chatId, 
        senderId, 
        text 
    });

    try {
        const response = await message.save();
        res.response(response);
    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const getMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        const messages = await messageModel.find({ chatId });
        res.response(messages);
    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};