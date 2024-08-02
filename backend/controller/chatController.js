import { Chat } from "../models/chat.js";
import { Conversation } from "../models/conversation.js";

export const createChat = async (req, res) => {
    try {
        const userId = req.user._id;

        const chat = await Chat.create({
            user: userId,
        })
        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find({ user: req.user._id }).sort({
            createdAt: -1,
        });

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const addConversation = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);

        if (!chat) {
            return res.status(404).json({
                message: "No chats found with this id",
            })
        }

        const conversation = await Conversation.create({
            chat: chat._id,
            question: req.body.question,
            answer: req.body.answer,
        })

        const updateChat = await Chat.findByIdAndUpdate(req.params.id,
            { latestMessage: req.body.answer, },
            { new: true, });


        res.status(200).json({
            conversation, 
            updateChat
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}