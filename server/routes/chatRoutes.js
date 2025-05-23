import express from "express";
import { sendMessage, getMessages, getChatsForUser } from "../controllers/chatController.js";

const router = express.Router();

router.post("/send", sendMessage);                      
router.get("/messages/:uid1/:uid2", getMessages);      
// router.get("/messages/:uid", getChatsForUser);

export default router;