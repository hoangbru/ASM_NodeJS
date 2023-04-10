import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import mongoose from "mongoose";
import morgan from "morgan";
import projectsRouter from "./routes/projects";
import categoriesRouter from "./routes/categories";
import technologiesRouter from "./routes/technologies";
import userRouter from "./routes/auth";
import { connectOnlDB, connectLocalDB } from "./config/connect";

const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use("/api", projectsRouter);
app.use("/api", categoriesRouter);
app.use("/api", technologiesRouter);
app.use("/api", userRouter);

mongoose.set('strictQuery', false);
// mongodb local
connectLocalDB();

// mongodb onl
// connectOnlDB();

export const viteNodeApp = app;
