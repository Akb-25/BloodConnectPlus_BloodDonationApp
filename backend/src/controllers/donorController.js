import { v4 as uuidv4 } from "uuid";
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

// Cloudinary config
cloudinary.config({
  cloud_name: 'dqsewwuif',
  api_key: '723952417737729',
  api_secret: 'Bo_BEo9e_ffirqBx0JX2zt7mJbs'
});

const getCityByUserId = async (userId) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const userData = snapshot.docs[0].data();
      const city = userData.selectedCity;
      console.log("City:", city);
      return city;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting city:", error);
    return null;
  }
};
// 1. Upload Donor
export const uploadDonor = async (req, res) => {
  try {
    const { userId, canDonate, city,  longitude, latitude, bloodGroup} = req.body;
    await addDoc(collection(db, "donors"), {
      userId,
      canDonate,
      city,
      longitude,
      latitude,
      bloodGroup
    });
    res.status(200).json({ message: "Donor uploaded successfully" });
  } catch (error) {
    console.error("Error trying to upload donor: ", error);
    res.status(500).json({ error: "Failed to upload donor", error });
  }
};

// 2. Get Donors by City
export const getDonorsByCity = async (req, res) => {
  try {
    const {city, bloodGroup} = req.params;
    const q = query(collection(db, "donors"), where("city", "==", city), where("canDonate", "==", true), where("bloodGroup", "==", bloodGroup));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(404).json({ message: "No donors found in the city" });
    }

    const donors = snapshot.docs.map(doc => doc.data());
    res.status(200).json(donors);
  } catch (error) {
    console.log("Error trying to get the donors: ", error);
    res.status(500).json({ error: "Failed to fetch the donors" });
  }
};

// 3. Get Donor by ID
export const getDonorById = async (req, res) => {
  try {
    const id = req.params.id;
    const q = query(collection(db, "donors"), where("id", "==", id));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(404).json({ message: `No donors found with id: ${id}` });
    }

    const donorDoc = snapshot.docs[0];
    res.status(200).json(donorDoc.data());
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the donor" });
  }
};

// 4. Update Donor
export const updateDonor = async (req, res) => {
  try {
    const { id, canDonate } = req.body;
    const q = query(collection(db, "donors"), where("id", "==", id));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(404).json({ message: `No donors found with id: ${id}` });
    }

    const donorDoc = snapshot.docs[0];
    await updateDoc(donorDoc.ref, { canDonate });

    res.status(200).json({ message: "Donor details updated successfully" });
  } catch (error) {
    console.log("Error trying to update the donor: ", error);
    res.status(500).json({ error: "Failed to update the donor" });
  }
};

// 5. Delete Donor
export const deleteDonor = async (req, res) => {
  try {
    const id = req.params.id;
    const q = query(collection(db, "donors"), where("id", "==", id));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(404).json({ message: `No donors found with id: ${id}` });
    }

    const donorDoc = snapshot.docs[0];
    await deleteDoc(donorDoc.ref);

    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (error) {
    console.log("Error trying to delete the donor: ", error);
    res.status(500).json({ error: "Failed to delete the donor" });
  }
};