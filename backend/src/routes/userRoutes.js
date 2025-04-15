import express from "express";
import {  uploadProfile, getProfile, updateProfile, deleteProfile } from "../controllers/userController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", upload, uploadProfile);
router.get("/profile/:id", getProfile);
router.post("/update", updateProfile);
router.get("/delete/:id", deleteProfile);

export default router;