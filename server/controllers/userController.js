import { auth, db } from "../config/firebase.js";
// import multer from "multer";
import cloudinary from 'cloudinary';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import streamifier from "streamifier";
// const storage = multer.memoryStorage();
// export const upload = multer({ storage }).single("photo");
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
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
    const userId = req.params.userId;
    console.log("Requested ID:", userId);
    const q = query(collection(db, "users"), 
    where("userId", "==", userId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(404).json({ error: "User not found" });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    console.log("User data:", userData);
    res.status(200).json({ ...userData });
  } catch (error) {
    console.error("Error trying to get the profile: ", error);
    res.status(500).json({ error: "Failed to fetch the profile" });
  }
};
export const registerProfile = async (req, res) => {
  try {
    const { email, supabaseAuthId } = req.body;
    const registerRef = collection(db, "registeredUsers");
    await addDoc(registerRef, {
      email,
      supabaseAuthId 
    });
    console.log("Added the user to the database");
    res.status(200).json({ message: "User profile uploaded successfully" });
  } catch (error) {
    console.error("Error uploading profile:", error);
    res.status(500).json({ error: "Failed to upload profile", error });
  }
};
export const getUserId = async (req, res) => {
  try {
    const email = req.params.email; 
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required." });
    }

    const q = query(collection(db, "registeredUsers"),
      where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log(`No user found for email: ${email}`);
      return res.status(404).json({ error: "User not found" });
    }

    const userDoc = snapshot.docs[0];
    const customUserId = userDoc.data().supabaseAuthId;

    console.log(`User ID for ${email}: ${customUserId}`);
    res.status(200).json({ userId: customUserId });
  } catch (error) {
    console.error("Error retrieving user ID:", error); 
    res.status(500).json({ error: "Failed to retrieve user ID", details: error.message });
  }
};

export const updateProfile = async (req, res) => {
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

    console.log("Update body:", req.body);
    let photoURL = "";

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
            reject(error);
          }
        });
      };

      try {
        photoURL = await streamUpload();
      } catch (error) {
        console.error("Cloudinary upload error:", error);
      }
    }

    const q = query(collection(db, "users"), where("userId", "==", userId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(404).json({ message: "No user found with given userId" });
    }

    const userDoc = snapshot.docs[0];

    const updateData = {
      name,
      phone,
      selectedCity,
      selectedCountry,
      dateOfBirth,
      gender,
      occupation,
      isDonor: isDonor === "true",
      aboutYourself,
    };

    if (photoURL) {
      updateData.photoURL = photoURL;
    }

    await updateDoc(userDoc.ref, updateData);

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
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