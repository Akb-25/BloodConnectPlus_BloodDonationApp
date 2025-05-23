import express from "express";
import { uploadRequest, getRequestById, uploadConnection, getConnectionsRequestedByUser, getConnectionsRequestedForUser} from "../controllers/requestController.js";

const router = express.Router();

router.post("/upload-connection", uploadConnection);
router.get("/get-request/:id", getRequestById);
router.post("/upload-request", uploadRequest);
router.get("/get-requests/:id", getConnectionsRequestedByUser);
router.get("/get-requests-sent/:id", getConnectionsRequestedForUser);

export default router;