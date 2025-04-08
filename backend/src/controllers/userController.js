import { db, bucket } from "../config/firebase.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage }).single("photo");

export const uploadProfile = async (req, res) => {
  try {
    const {
      name, phone, city, country, dateOfBirth,
      gender, occupation, isDonor, about
    } = req.body;

    let photoURL = "";
    if (req.file) {
      const filename = `profile_photos/${uuidv4()}.jpg`;
      const file = bucket.file(filename);
      await file.save(req.file.buffer, {
        metadata: { contentType: req.file.mimetype },
      });
      photoURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filename)}?alt=media`;
    }
    const id = uuidv4();

    await db.collection("users").add({
      id, name, phone, city, country, dateOfBirth,
      gender, occupation, isDonor: isDonor === "true",
      about, photoURL, createdAt: new Date()
    });

    res.status(200).json({ message: "User profile uploaded successfully" });
  } catch (error) {
    console.error("Error uploading profile:", error);
    res.status(500).json({ error: "Failed to upload profile" });
  }
};

export const getProfile = async (req, res) => {
  try{
    const requestedId = req.params.id;
    const snapshot = await db.collection("users").where("id", "==", requestedId).get();

    if (snapshot.empty){
      return res.status(404).json({ error: "User not found" });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    res.status(200).json({ ...userData });

  } catch (error) {
    console.error("Error trying to get the profile: ", error);
    res.status(500).json({ error: "Failed to fetch the profile" });
  }
};

export const updateProfile = async (req, res) => {
  try{
    const { id, name, phone, city, country, dateOfBirth,
      gender, occupation, isDonor, about } = req.body;
    const snapshot = await db.collection("users").where("id", "==", id).get();
    if (snapshot.empty){
      return res.status(404).json({ message: "No users found with id: ", id });
    }

    const userDoc = snapshot.docs[0];
    await userDoc.ref.update({
      name, phone, city, country, dateOfBirth,
      gender, occupation, isDonor: isDonor === "true",
      about
    });

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error trying to get the profile: ", error);
    res.status(500).json({ error: "Failed to fetch the profile" });
  }
};

export const deleteUser = async (req, res) => {
  try{
    const id = req.params.id;
    const snapshot = await db.collections("users").where("id", "==", id);
    
    if(snapshot.empty) {
      return res.status(404).json({ message: "No users found with id: ", id});
    }

    const userDoc = snapshot.docs[0];
    await userDoc.ref.delete();
    res.status(200).json({ message: `User with id ${id} has been deleted succesfully now` });

  } catch (error) {
    console.error("Error trying to get the profile: ", error);
    res.staus(500).json({ error: "Failed to fetch the profile to perform the thread" });
  }
}

export const uploadDonors = async (req, res) => {
  try{
    const { id, canDonate, city } = req.body;
    await(db.collection("donors").add({
      id, canDonate, city
    }));
    res.status(200).json({ message: "Donor uploaded successfully" });
  } catch (error) {
    console.error("Error trying to get the profile: ", error);
    res.status(500).json({ error: "Failed to fetch the profile" });
  }
};

export const getDonors = async (req, res) => {
  try{
    const city = req.params.city;
    const snapshot = await db.collection("donors").where("city", "==", city).where("canDonate", "==", true).get();
    if (snapshot.empty()){
      return res.status(404).json({ message: "No donors found in the city" });
    }

    const donors = snapshot.docs.map(doc => doc.data());
    res.status(200).json(donors);
  } catch (error) {
    console.log("Error trying to get the donors: ", error);
    res.status(500).json({ error: "Failed to fetch the donors" });
  }
};

export const getDonorById = async (req, res) => {
  try{
    const {id} = req.params.id;

    const snapshot = await db.collection("donors").where("id", "==", id);

    if (snapshot.empty){
      return res.status(404).json({ message: "No donors found in the city with id: ", id});
    } 

    const donorDoc = snapshot.docs[0];

    res.status(200).json(donorDoc.data());
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the donors" });
  }
}

export const updateDonor = async (req, res) => {
  try{
    const { id, canDonate } = req.body;
    await db.collection("donors").where("id", "==", id).get();
    if (snapshot.empty()){
      return res.status(404).json({ message: "No donors found in the city with id: ", id});
    }

    const donorDoc = snapshot.docs[0];
    const docorDoc = snapshot.docs[0];

    await donorDoc.ref.update({ canDonate });
    res.status(200).json({ message: "Donor details are updated successfully" });
  } catch (error) {
    console.log("Error trying to update the donor: ", error);
    res.status(500).json({ error: "Failed to update the donor" });
  }
};

export const deleteDonor = async (req, res) => {
  try{
    const id = req.params.id;
    const snapshot = await db.collection("donors").where("id", "==", id);

    if (snapshot.empty){
      return res.status(404).json({ message: "No donors found in the city with id: ", id});
    }

    const donorDoc = snapshot.docs[0];

    await donorDoc.ref.delete();
    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (error) {
    console.log("Error trying to delete the donor: ", error);
    res.status(500).json({ error: "Failed to delete the donor" });
  }
}

