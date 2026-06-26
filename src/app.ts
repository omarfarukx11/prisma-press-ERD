import cookieParser from "cookie-parser";
import express, { Application, Request, request, Response } from "express";
import cors from "cors";
import config from "./config";
import { prisma } from "./lib/prisma";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { userRouter } from "./modules/users/user.route";

const app: Application = express();

app.use(cors({ origin: config.app_url, credentials: true }));
(app.use(express.json()), app.use(express.urlencoded({ extended: true })));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  res.send("hello world how are you hope you are so well");
});

app.use("/api/users", userRouter)

export default app;
