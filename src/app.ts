import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRouter } from "./modules/users/user.route";
import { authRouter } from "./modules/auth/auth.route";
import { postRouter } from "./modules/post/post.route";
import { commentRouter } from "./modules/comment/comment.route";
import { notFound } from "./middlewares/notFound";
import httpStatus from "http-status";
import { globalError } from "./middlewares/globalError";
import { subscriptionRoute } from "./modules/subscription/subscriptoin.route";
import { stripe } from "./lib/stripe";

const app: Application = express();
app.use(cors({ origin: config.app_url, credentials: true }));

const endpointSecret = config.stripe_webhook_secret

app.post("/api/subscription/webhook" , express.raw({type :"application/json"}) , (request , response) => {
  let event = request.body;
  if (endpointSecret) {
    const signature = request.headers['stripe-signature']!;
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err : any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.status(400).json({
        mesaage : err.mesaage
      });
    }
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      break;
    default:

      console.log(`Unhandled event type ${event.type}.`);
  }

  response.send();
})
app.use(express.json()), 
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
