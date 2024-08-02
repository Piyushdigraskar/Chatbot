import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { addConversation, createChat, getAllChats, getConversation } from '../controller/chatController.js';

const router = express.Router();

router.post('/new', isAuth, createChat);

router.get('/all', isAuth, getAllChats);

router.post('/:id', isAuth, addConversation);

router.get('/:id', isAuth, getConversation)

export default router;