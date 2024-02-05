import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

mongoose
    .connect(process.env.MONGODB_CONNECTINO_STRING as string)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e));

const app = express();
app.use(cookieParser());
app.use(express.json()); //Json what this does is it helps convert the body of API requests into Json automatically
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

// app.get("/api/test", async (req: Request, res: Response) => {
//     res.json({ message: "Hello from express endpoint!" });
// });

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(7000, () => {
    console.log("Server running on localhost:7000");
});
