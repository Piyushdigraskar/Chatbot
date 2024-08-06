import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { addConversation, createChat, deleteChat, getAllChats, getConversation, downloadChat } from '../controller/chatController.js';

const router = express.Router();

router.post('/new', isAuth, createChat);

router.get('/all', isAuth, getAllChats);

router.post('/:id', isAuth, addConversation);

router.get('/:id', isAuth, getConversation)

router.delete('/:id', isAuth, deleteChat)

router.get('/download/:id', isAuth, downloadChat)

export default router;