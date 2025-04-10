import React from "react";
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


export const uploadDonor = async (req, res) => {
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
  
  