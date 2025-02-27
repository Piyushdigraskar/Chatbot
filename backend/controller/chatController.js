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
            { latestMessage: req.body.question },
            { new: true, });


        res.status(200).json({
            conversation, 
            updateChat
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


export const getConversation = async(req, res)=>{
    try {
        const conversation = await Conversation.find({
            chat: req.params.id
        })

        if (!conversation) {
            return res.status(404).json({
                message: "No conversations found with this id",
            })
        }


        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const deleteChat = async(req, res)=>{
    try {
        const chat = await Chat.findById(req.params.id);

        if (!chat) {
            return res.status(404).json({
                message: "No chats found with this id",
            })
        }

        if(chat.user.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message:"Unauthorized",
            })
        }

        await chat.deleteOne();

        res.status(200).json({
            message: "Chat Deleted",
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const downloadChat = async (req, res) => {
    try {
      const chatId = req.params.id;
      const conversations = await Conversation.find({ chat: chatId });
      if (!conversations) {
        return res.status(404).send({ message: 'Conversation not found' });
      }
      const chatData = conversations.map(conversation => `${conversation.question}\n${conversation.answer}\n\n`).join('');
      res.setHeader('Content-Disposition', `attachment; filename="chat.txt"`);
      res.setHeader('Content-Type', 'text/plain');
      res.send(chatData);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error downloading chat data' });
    }
  };