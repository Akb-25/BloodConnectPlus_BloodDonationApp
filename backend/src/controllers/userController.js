import { db, bucket } from "../config/firebase.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import cloudinary from 'cloudinary';

const storage = multer.memoryStorage();
export const upload = multer({ storage }).single("photo");


cloudinary.config({ 
  cloud_name: 'dqsewwuif',
  api_key: '723952417737729', 
  api_secret: 'Bo_BEo9e_ffirqBx0JX2zt7mJbs'
});


export const uploadProfile = async (req, res) => {
  try {
    const {
      name, phone, city, country, dateOfBirth,
      gender, occupation, isDonor, about
    } = req.body;

    let photoURL = "";
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (result) {
            photoURL = result.secure_url;
          }
        }
      );
      req.file.stream.pipe(result);
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
