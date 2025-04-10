import express from "express";
import { getDonorById, getDonors, uploadDonor, updateDonor, deleteDonor } from "../controllers/donorController.js";

const router = express.Router();

router.post("/upload-donor", uploadDonor);
router.get("/get-donor/:id", getDonorById);
router.get("/get-donors/:city", getDonors);
router.put("/update-donor", updateDonor);
router.delete("/delete-donor/:id", deleteDonor);

export default router;