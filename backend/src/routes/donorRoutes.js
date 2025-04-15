import express from "express";
import { getDonorById, getDonorsByCity, uploadDonor, updateDonor, deleteDonor } from "../controllers/donorController.js";

const router = express.Router();

router.post("/upload-donor", uploadDonor);
router.get("/get-donor/:id", getDonorById);
router.get("/get-donor-city/:city/:bloodGroup", getDonorsByCity);
router.put("/update-donor", updateDonor);
router.delete("/delete-donor/:id", deleteDonor);

export default router;