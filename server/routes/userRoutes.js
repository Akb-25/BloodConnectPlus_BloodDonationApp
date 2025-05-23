import express from "express";
import {  uploadProfile, registerProfile, getProfile, getUserId, updateProfile, deleteProfile } from "../controllers/userController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", upload, uploadProfile);
router.get("/get-user-id/:email", getUserId );
router.post("/register-profile", registerProfile);
router.get("/profile/:userId", getProfile);
router.post("/update", upload, updateProfile);
router.get("/delete/:id", deleteProfile);

export default router;