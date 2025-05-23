import express from "express";
import { getDonorById, getDonorsByCity, uploadDonor, updateDonor, deleteDonor, getScheduledDonationAsDonor, getScheduledDonationAsReceiver, getUserDonationsCount, confirmDonationAsDonor, confirmDonationAsReceiver, cancelDonationAsDonor, cancelDonationAsReceiver, getDonorsByCountry, getDonorsByWorld, ScheduleDonationAsDonor, ScheduleDonationAsReceiver } 
from "../controllers/donorController.js";

const router = express.Router();

router.post("/upload-donor", uploadDonor);
router.get("/get-donor/:id", getDonorById);
router.post("/confirm-donation-as-donor/", confirmDonationAsDonor);
router.post("/confirm-donation-as-receiver/", confirmDonationAsReceiver);
router.post("/cancel-donation-as-donor/", cancelDonationAsDonor);
router.post("/cancel-donation-as-receiver/", cancelDonationAsReceiver);
router.get("/get-donor-city/:city/:bloodGroup", getDonorsByCity);
router.get("/get-donor-country/:country/:bloodGroup", getDonorsByCountry);
router.get("/get-donor-world/:bloodGroup", getDonorsByWorld);
router.put("/update-donor", updateDonor);
router.delete("/delete-donor/:id", deleteDonor);
router.post("/schedule-donation-as-donor", ScheduleDonationAsDonor)
router.post("/schedule-donation-as-receiver", ScheduleDonationAsReceiver)
router.get("/get-scheduled-donation-as-donor", getScheduledDonationAsDonor)
router.get("/get-scheduled-donation-as-receiver", getScheduledDonationAsReceiver)
router.get("/get-user-donations-count/:userId", getUserDonationsCount);

export default router;