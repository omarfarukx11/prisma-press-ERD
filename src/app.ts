import cookieParser from "cookie-parser";
import express, { Application, Request, request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRouter } from "./modules/users/user.route";
import { authRouter } from "./modules/auth/auth.route";
import { postRouter } from "./modules/post/post.route";
import { commentRouter } from "./modules/comment/comment.route";

const app: Application = express();

app.use(cors({ origin: config.app_url, credentials: true }));
(app.use(express.json()), app.use(express.urlencoded({ extended: true })));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  res.send("hello world how are you hope you are so well");
});

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/posts" , postRouter)
app.use("/api/comments", commentRouter)


export default app;
