import { auth, db, storage } from "../config/firebase.js";
// import multer from "multer";
import cloudinary from 'cloudinary';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import streamifier from "streamifier";
// const storage = multer.memoryStorage();
// export const upload = multer({ storage }).single("photo");


cloudinary.config({ 
  cloud_name: 'dqsewwuif',
  api_key: '723952417737729', 
  api_secret: 'Bo_BEo9e_ffirqBx0JX2zt7mJbs'
});


export const uploadProfile = async (req, res) => {
  try {
    const {
      userId,
      name,
      phone,
      selectedCity,
      selectedCountry,
      dateOfBirth,
      gender,
      occupation,
      isDonor,
      aboutYourself,
    } = req.body;
    console.log("Request body:", req.body);
    let photoURL = "";
    console.log(req.file);
    if (req.file) {
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          try {
            const stream = cloudinary.v2.uploader.upload_stream(
              { resource_type: "image" },
              (error, result) => {
                if (result) {
                  resolve(result.secure_url);
                } else {
                  reject(error);
                }
              }
            );

            streamifier.createReadStream(req.file.buffer).pipe(stream);
          } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            reject(error);
          }
        });
      };

      try {
        photoURL = await streamUpload(); 
      } catch (error) {
        console.error("Error during the upload process:", error);
      }
    }

    const usersRef = collection(db, "users");

    if (!photoURL) {
      photoURL = "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"; 
    }
    await addDoc(usersRef, {
      userId, 
      name,
      phone,
      selectedCity,
      selectedCountry,
      dateOfBirth,
      gender,
      occupation,
      isDonor: isDonor === "true", 
      aboutYourself,
      photoURL,
      createdAt: new Date(),
    });
    console.log("Added the user to the database");
    res.status(200).json({ message: "User profile uploaded successfully" });
  } catch (error) {
    console.error("Error uploading profile:", error);
    res.status(500).json({ error: "Failed to upload profile", error });
  }
};

export const getProfile = async (req, res) => {
  try {
    const requestedId = req.params.id;

    const q = query(collection(db, "users"), where("id", "==", requestedId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
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

export const deleteProfile = async (req, res) => {
  try {
    const id = req.params.id;

    const q = query(collection(db, "users"), where("id", "==", id));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(404).json({ message: `No users found with id: ${id}` });
    }

    const userDoc = snapshot.docs[0];
    await deleteDoc(userDoc.ref);

    res.status(200).json({ message: `User with id ${id} has been deleted successfully now` });
  } catch (error) {
    console.error("Error trying to delete the profile: ", error);
    res.status(500).json({ error: "Failed to delete the profile" });
  }
};