import { db } from "../config/firebase.js";
import cloudinary from 'cloudinary';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

const uploadRequest = async (req, res) => {
    const {
        userId,
        recipientName,
        recipientPhone,
        recipientSelectedCity,
        recipientSelectedCountry,
        date,
        time,
        bloodGroup,
        gender,
        hospitalName,
        address,
        amountOfBlood,
        reason,
        contactPersonName,
        contactPersonPhone,
    } = req.body;
    try{
        await addDoc(collection(db, "requests"), {
            userId,
            recipientName,
            recipientPhone,
            recipientSelectedCity,
            recipientSelectedCountry,
            date,
            time,
            bloodGroup,
            gender,
            hospitalName,
            address,
            amountOfBlood,
            reason,
            contactPersonName,
            contactPersonPhone
        });
        console.log("Request uploaded successfully");
        res.status(200).json({ message: "Request uploaded successfully" });
    } catch (error) {
        console.error("Error trying to upload request: ", error);
        res.status(500).json({ error: "Failed to upload request" });
    }
}

const getRequestById = async (req, res) => {
    const requestId = req.params.id;
    console.log("Requested ID:", requestId);
    try {
        const q = query(collection(db, "requests"), where("userId", "==", requestId));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            return res.status(200).json([]);
        }
        const request = snapshot.docs[0].data();
        res.status(200).json(request);
    } catch (error) {
        console.error("Error trying to get the request: ", error);
        res.status(500).json({ error: "Failed to fetch the request" });
    }
}

const getConnectionsRequestedByUser = async (req, res) => {
    const userId = req.params.id;
    try {
      const q = query(collection(db, "connections"), where("senderId", "==", userId));
      const snapshot = await getDocs(q);
  
      if (snapshot.empty) return res.status(200).json([]);
  
      const connections = [];
  
      for (const doc of snapshot.docs) {
        const data = doc.data();
        const userQuery = query(collection(db, "users"), where("userId", "==", data.receiverId));
        const userSnap = await getDocs(userQuery);
  
        if (!userSnap.empty) {
          const userData = userSnap.docs[0].data();
          connections.push({ ...data, userProfile: userData });
        }
      }
      console.log("Connections requested by the user:", connections);
  
      res.status(200).json(connections);
    } catch (error) {
      console.error("Error trying to get the requests: ", error);
      res.status(500).json({ error: "Failed to fetch the requests" });
    }
  };

const getConnectionsRequestedForUser = async (req, res) => {
    const userId = req.params.id;
    try {
      console.log("Requested ID:", userId);
      const q = query(collection(db, "connections"), where("receiverId", "==", userId));
      const snapshot = await getDocs(q);
  
      if (snapshot.empty) return res.status(200).json([]);
  
      const connections = [];
  
      for (const doc of snapshot.docs) {
        const data = doc.data();
        const userQuery = query(collection(db, "users"), where("userId", "==", data.senderId));
        const userSnap = await getDocs(userQuery);
  
        if (!userSnap.empty) {
          const userData = userSnap.docs[0].data();
          connections.push({ ...data, userProfile: userData });
        }
      }
      console.log("Connections requested for the user:", connections);

      res.status(200).json(connections);
    } catch (error) {
      console.error("Error trying to get the connections: ", error);
      res.status(500).json({ error: "Failed to fetch the connections" });
    }
};
const uploadConnection = async (req, res) => {
    const { senderId, receiverId } = req.body;
    try{
        const q = query(collection(db, "connections"), 
        where("senderId", "==", senderId), 
        where("receiverId", "==", receiverId));
        const snapshot = await getDocs(q);
        if (!snapshot.empty){
            return res.status(200).json({ message: "Connection already exists" });
        } 
    } catch(error){
        console.error("Error trying to check if connection exists: ", error);
        res.status(500).json({ error: "Failed to check if connection exists" });
    }
    console.log(senderId, receiverId);
    try {
        await addDoc(collection(db, "connections"), {
            senderId,
            receiverId
        });
        console.log("Connection uploaded successfully");
        res.status(200).json({ message: "Connection uploaded successfully" });
    } catch (error) {
        console.error("Error trying to upload connection: ", error);
        res.status(500).json({ error: "Failed to upload connection" });
    }
};

export { uploadRequest, getRequestById, uploadConnection, getConnectionsRequestedByUser, getConnectionsRequestedForUser };
