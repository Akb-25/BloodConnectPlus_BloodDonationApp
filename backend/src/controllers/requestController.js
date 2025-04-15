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

const getConnectionsForUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const q = query(collection(db, "requests"), where("userId", "==", userId));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            return res.status(404).json({ message: "No requests found for the user" });
        }
        const requests = snapshot.docs.map(doc => doc.data());
        res.status(200).json(requests);
    } catch (error) {
        console.error("Error trying to get the requests: ", error);
        res.status(500).json({ error: "Failed to fetch the requests" });
    }
}

const getConnectionsRequestedForUser = async (req, res) => {
    const userId = req.params.id;
    try{
        const q = query(collection(db, "connections"), where("receiverId", "==", userId));
        const snapshot = await getDocs(q);
        if (snapshot.empty){
            return res.status(404).json({ message: "No connections found for the user" });
        }
        const connections = snapshot.docs.map(doc => doc.data());
        res.status(200).json(connections);
    } catch (error) {
        console.error("Error trying to get the connections: ", error);
        res.status(500).json({ error: "Failed to fetch the connections" });
    }
}
const uploadConnection = async (req, res) => {
    const { senderId, receiverId } = req.body;
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

export { uploadRequest, uploadConnection, getConnectionsForUser, getConnectionsRequestedForUser };

