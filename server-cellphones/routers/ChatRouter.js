import express from 'express'
import { getAllConversation, createSaveMessage, getMessageByConversation } from '../controllers/ChatController.js'

const router = express.Router()

router.get('/', getAllConversation)

router.get('/message', getMessageByConversation);

router.post('/save', createSaveMessage)

export default router