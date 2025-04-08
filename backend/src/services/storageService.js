import { bucket } from "../config/firebase.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export const uploadFileToStorage = async (file) => {
    const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
        metadata: {
            contentType: file.mimetype
        }
    });

    const [url] = await fileUpload.getSignedUrl({
        action: "read",
        expires: "03-01-2030"
    });

    return url;
};