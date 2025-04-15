import express from "express";
import { uploadRequest, uploadConnection, getConnectionsForUser, getConnectionsRequestedForUser} from "../controllers/requestController.js";

const router = express.Router();

router.post("/upload-connection", uploadConnection);
router.post("/upload-request", uploadRequest);
router.get("/get-requests/:id", getConnectionsForUser);
router.get("/get-requests-sent/:id", getConnectionsRequestedForUser);

export default router;