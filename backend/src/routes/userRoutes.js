import express from "express";
import { getDonors, getProfile, uploadDonors, uploadProfileData } from "../controllers/userController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", upload.single("photo"), uploadProfileData);
router.get("/profile/:id", getProfile);
router.post("/donors/upload", uploadDonors);
router.get("/donors/:city", getDonors);

export default router;