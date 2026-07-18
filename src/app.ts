import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRouter } from "./modules/users/user.route";
import { authRouter } from "./modules/auth/auth.route";
import { postRouter } from "./modules/post/post.route";
import { commentRouter } from "./modules/comment/comment.route";
import { notFound } from "./middlewares/notFound";
import { globalError } from "./middlewares/globalError";
import { subscriptionRoute } from "./modules/subscription/subscriptoin.route";


const app: Application = express();
app.use(cors({ origin: config.app_url, credentials: true }));


app.use("/api/subscription/webhook" , express.raw({type :"application/json"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", async (req: Request, res: Response) => {
  res.send("hello world how are you hope you are so well");
});

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/posts" , postRouter)
app.use("/api/comments", commentRouter)
app.use("/api/subscription" , subscriptionRoute)

app.use(notFound)

app.use(globalError)

export default app;
