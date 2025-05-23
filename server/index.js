import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.use("/user", userRoutes);
app.use("/donor", donorRoutes);
app.use("/chat", chatRoutes);
app.use("/request", requestRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get("/", (req, res) => res.send("Hello World!"));