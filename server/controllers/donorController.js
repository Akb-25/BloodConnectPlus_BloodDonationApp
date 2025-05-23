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

import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
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

export const getDonorsByCity = async (req, res) => {
  try {
    const { city, bloodGroup } = req.params;
    // console.log("City:", city);
    // console.log("Blood Group:", bloodGroup);
    const donorQuery = query(
      collection(db, "donors"),
      where("city", "==", city),
      where("canDonate", "==", true),
      where("bloodGroup", "==", bloodGroup)
    );

    const donorSnapshot = await getDocs(donorQuery);

    if (donorSnapshot.empty) {
      return res.status(200).json([]);
    }

    const donors = donorSnapshot.docs.map(doc => doc.data());
    const userProfiles = [];

    for (const donor of donors) {
      const { userId, latitude, longitude } = donor;

      const userQuery = query(
        collection(db, "users"),
        where("userId", "==", userId)
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        userProfiles.push({
          ...userData,
          latitude,
          longitude
        });
      }
    }

    res.status(200).json(userProfiles);
  } catch (error) {
    console.error("Error fetching donors with profiles:", error);
    res.status(500).json({ error: "Failed to fetch donors and profiles" });
  }
};

export const getDonorsByCountry = async (req, res) => {
  try {
    const { country, bloodGroup } = req.params;

    const donorQuery = query(
      collection(db, "donors"),
      where("canDonate", "==", true),
      where("bloodGroup", "==", bloodGroup)
    );
      
    const donorSnapshot = await getDocs(donorQuery);

    if (donorSnapshot.empty) {
      return res.status(200).json([]);
    }

    const donors = donorSnapshot.docs.map(doc => doc.data());
    const userProfiles = [];
    console.log("The donors are: ", donors);
    for (const donor of donors) {
      const { userId, latitude, longitude } = donor;

      const userQuery = query(
        collection(db, "users"),
        where("selectedCountry", "==", country),
        where("userId", "==", userId)
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        userProfiles.push({
          ...userData,
          latitude,
          longitude
        });
      }
    }

    res.status(200).json(userProfiles);
  } catch (error) {
    console.error("Error fetching donors with profiles:", error);
    res.status(500).json({ error: "Failed to fetch donors and profiles" });
  }
};

export const getDonorsByWorld = async (req, res) => {
  try {
    const { bloodGroup } = req.params;

    const donorQuery = query(
      collection(db, "donors"),
      where("canDonate", "==", true),
      where("bloodGroup", "==", bloodGroup)
    );

    const donorSnapshot = await getDocs(donorQuery);

    if (donorSnapshot.empty) {
      return res.status(200).json([]);
    }

    const donors = donorSnapshot.docs.map(doc => doc.data());
    const userProfiles = [];

    for (const donor of donors) {
      const { userId, latitude, longitude } = donor;

      const userQuery = query(
        collection(db, "users"),
        where("userId", "==", userId)
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        userProfiles.push({
          ...userData,
          latitude,
          longitude
        });
      }
    }

    res.status(200).json(userProfiles);
  } catch (error) {
    console.error("Error fetching donors with profiles:", error);
    res.status(500).json({ error: "Failed to fetch donors and profiles" });
  }
};

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


export const ScheduleDonationAsDonor = async (req, res) => {
  try{
    const {donorId, receiverId} = req.body;
    console.log("The ids to schedule donation are: ", donorId, receiverId);
    await addDoc(collection(db, "scheduledDonationsForDonor"), {
      donorId,
      receiverId,
      status: "pending"
    });

    res.status(200).json({ message: "Donation scheduled successfully" });
  } catch (error) {
    console.error("Error trying to schedule the donation: ", error);
    res.status(500).json({ error: "Failed to schedule the donation" });
  }
}

export const ScheduleDonationAsReceiver = async (req, res) => {
  try{
    const {donorId, receiverId} = req.body;
    console.log("The ids to schedule donation are: ", donorId, receiverId);
    await addDoc(collection(db, "scheduledDonationsForReceiever"), {
      donorId,
      receiverId,
      status: "pending"
    });

    res.status(200).json({ message: "Donation scheduled successfully" });
  } catch (error) {
    console.error("Error trying to schedule the donation: ", error);
    res.status(500).json({ error: "Failed to schedule the donation" });
  }
}
export const getScheduledDonationAsDonor = async (req, res) => {
  try{
    let id = req.query.userId;
    // console.log("The id to search for donations scheduled is: ", id);
    console.log("The id to search for donations scheduled is: ", id);
    id = id.trim();
    const q = query(
      collection(db, "scheduledDonationsForDonor"),
      where("donorId", "==", id),
      where("status", "==", "pending")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return res.status(200).json([]);
    }
    const scheduledDonations = snapshot.docs.map(doc => doc.data());
    res.status(200).json(scheduledDonations);
} catch (error) {
    console.error("Error trying to get the scheduled donations: ", error);
    res.status(500).json({ error: "Failed to fetch the scheduled donations" });
  }
}
export const getScheduledDonationAsReceiver = async (req, res) => {
  try{
    let id = req.query.userId;
    // console.log("The id to search for donations scheduled is: ", id);
    console.log("The id to search for donations scheduled is: ", id);
    id = id.trim();
    const q = query(
      collection(db, "scheduledDonationsForReceiver"),
      where("receiverId", "==", id),
      where("status", "==", "pending")
    );
    const snapshot = await getDocs(q);
    console.log("The snapshot is: ", snapshot);
    if (snapshot.empty) {
      return res.status(200).json([]);
    }
    const scheduledDonations = snapshot.docs.map(doc => doc.data());
    res.status(200).json(scheduledDonations);
} catch (error) {
    console.error("Error trying to get the scheduled donations: ", error);
    res.status(500).json({ error: "Failed to fetch the scheduled donations" });
  }
}

export const confirmDonationAsDonor = async (req, res) => {
  try{
    const { userId, otherId } = req.body;
    console.log("The ids to confirm donation are: ", userId, otherId);
    const q = query(
      collection(db, "scheduledDonationsForDonor"),
      where("donorId", "==", userId),
      where("receiverId", "==", otherId),
      where("status", "==", "pending")
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const scheduledDonationDoc = snapshot.docs[0];
      await updateDoc(scheduledDonationDoc.ref, { status: "completed" });
    }
    res.status(200).json({ message: "Donation is confirmed by donor" });
  } catch (error) {
    console.error("Error trying to confirm the donation: ", error);
    res.status(500).json({ error: "Failed to confirm the donation" });
  }
}
export const confirmDonationAsReceiver = async (req, res) => {
  try{
    const { userId, otherId } = req.body;
    console.log("The ids to confirm donation are: ", userId, otherId);
    const q = query(
      collection(db, "scheduledDonationsForReceiver"),
      where("donorId", "==", userId),
      where("receiverId", "==", otherId),
      where("status", "==", "pending")
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const scheduledDonationDoc = snapshot.docs[0];
      await updateDoc(scheduledDonationDoc.ref, { status: "completed" });
    }
    res.status(200).json({ message: "Donation is confirmed by donor" });
  } catch (error) {
    console.error("Error trying to confirm the donation: ", error);
    res.status(500).json({ error: "Failed to confirm the donation" });
  }
}

export const cancelDonationAsDonor = async (req, res) => {
  try{
    const { userId, otherId } = req.body;
    const q = query(
      collection(db, "scheduledDonationsForDonor"),
      where("donorId", "in", [userId]),
      where("receiverId", "in", [otherId]),
      where("status", "==", "pending")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return res.status(200).json([]);
    }
    const scheduledDonationDoc = snapshot.docs[0];
    await updateDoc(scheduledDonationDoc.ref, { status: "cancelled" });
    res.status(200).json({ message: "Donation cancelled successfully" });
  } catch (error) {
    console.error("Error trying to cancel the donation: ", error);
    res.status(500).json({ error: "Failed to cancel the donation" });
  }
}
export const cancelDonationAsReceiver = async (req, res) => {
  try{
    const { userId, otherId } = req.body;
    const q = query(
      collection(db, "scheduledDonationsForReceiver"),
      where("donorId", "in", [userId]),
      where("receiverId", "in", [otherId]),
      where("status", "==", "pending")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return res.status(200).json([]);
    }
    const scheduledDonationDoc = snapshot.docs[0];
    await updateDoc(scheduledDonationDoc.ref, { status: "cancelled" });
    res.status(200).json({ message: "Donation cancelled successfully" });
  } catch (error) {
    console.error("Error trying to cancel the donation: ", error);
    res.status(500).json({ error: "Failed to cancel the donation" });
  }
}

export const getUserDonationsCount = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("The user id to get the donations count is: ", userId);
    const q = query(collection(db, "scheduledDonationsForDonor"), where("donorId", "==", userId), where("status", "==", "completed"));
    const snapshot = await getDocs(q);
    const count = snapshot.size;
    res.status(200).json({data: count });
  } catch (error) {
    console.log("Error trying to get the donations count: ", error);
    res.status(500).json({ error: "Failed to fetch the donations count" });
  }
};