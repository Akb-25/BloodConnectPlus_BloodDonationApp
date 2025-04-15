import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../config/firebase.js";

const generateChatId = (uid1, uid2) => {
  return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
};

// SEND MESSAGE
export const sendMessage = async (req, res) => {
  const { senderId, receiverId, text } = req.body;

  try {
    const chatId = generateChatId(senderId, receiverId);
    const chatRef = doc(db, "chats", chatId);
    const chatDoc = await getDoc(chatRef);

    if (!chatDoc.exists()) {
      await setDoc(chatRef, {
        members: [senderId, receiverId],
        lastMessage: text,
        lastUpdated: serverTimestamp(),
      });
    } else {
      await updateDoc(chatRef, {
        lastMessage: text,
        lastUpdated: serverTimestamp(),
      });
    }

    const messagesRef = collection(db, "chats", chatId, "messages");
    await addDoc(messagesRef, {
      senderId,
      text,
      seen: false,
      timestamp: serverTimestamp(),
    });

    res.status(200).json({ message: "Message sent" });
  } catch (err) {
    res.status(500).json({ error: "Error sending message", details: err.message });
  }
};

// GET MESSAGES
export const getMessages = async (req, res) => {
  const { uid1, uid2 } = req.params;

  try {
    const chatId = generateChatId(uid1, uid2);
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef);
    const snapshot = await getDocs(q);

    const messages = await Promise.all(snapshot.docs.map(async (docSnap) => {
      const data = docSnap.data();
      const senderRef = doc(db, "users", data.senderId);
      const senderSnap = await getDoc(senderRef);
      const senderData = senderSnap.exists() ? senderSnap.data() : {};

      return {
        id: docSnap.id,
        ...data,
        senderPhotoURL: senderData.photoURL || ""
      };
    }));

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Error fetching messages", details: err.message });
  }
};

// GET CHATS FOR USER
export const getChatsForUser = async (req, res) => {
  const uid = req.params.uid;
  if (!uid){
    return res.status(400).json({ error:"userID should not be empty"})
  }

  try {
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("members", "array-contains", uid));
    const snapshot = await getDocs(q);

    const chats = await Promise.all(snapshot.docs.map(async (docSnap) => {
      const data = docSnap.data();
      const otherUserId = data.members.find(id => id !== uid);
      const userRef = doc(db, "users", otherUserId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.exists() ? userDoc.data() : {};

      return {
        chatId: docSnap.id,
        lastMessage: data.lastMessage,
        lastUpdated: data.lastUpdated,
        user: {
          id: otherUserId,
          name: userData.name || "",
          photoURL: userData.photoURL || ""
        }
      };
    }));

    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: "Error fetching chats", details: err.message });
  }
};








