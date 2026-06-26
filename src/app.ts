import cookieParser from "cookie-parser";
import express, { Application, Request, request, Response } from "express";
import cors from "cors";
import config from "./config";
import { prisma } from "./lib/prisma";
import httpStatus from "http-status";
import bcrypt from "bcrypt";

const app: Application = express();

app.use(cors({ origin: config.app_url, credentials: true }));
(app.use(express.json()), app.use(express.urlencoded({ extended: true })));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  res.send("hello world how are you hope you are so well");
});

app.post("/api/users/register", async (req: Request, res: Response) => {
  const { name, email, password, profilePhoto } = req.body;
  const isUserExist = await prisma.user.findUnique({ where: { email } });
  if (isUserExist) {
    throw new Error("user already exists");
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await prisma.profile.create({
    data: {
      userId: createdUser.id,
      profilePhoto,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email,
    },
    omit : {
        password : true
    },
    include : {
        profile : true
    }
  });

  res.status(httpStatus.CREATED).json({
    succes: true,
    statusCode : httpStatus.CREATED,
    message: "User Regester successfully",
    data : {user}
  });
});

export default app;
