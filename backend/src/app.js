import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

// dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/donor", donorRoutes);
app.use("/chat", chatRoutes);
app.use("/request", requestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
    res.send("Backend is up and running!");
});