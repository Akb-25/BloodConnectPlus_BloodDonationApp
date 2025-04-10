import express from "express";
import { sendMessage, getMessages, getMessagesForUser } from "../controllers/chatController.js";

const router = express.Router();

router.post("/send", sendMessage);                      
router.get("/messages/:uid1/:uid2", getMessages);      
router.get("/messages/:uid1", getMessagesForUser);

export default router;