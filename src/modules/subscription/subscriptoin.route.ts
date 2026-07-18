import { Router } from "express";
import { subscriptionController } from "./subcription.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const route = Router()

route.post("/checkout" ,auth(Role.USER , Role.AUTHOR , Role.ADMIN), subscriptionController.createCheckoutSession)
route.post("/webhook" , subscriptionController.handleCheckout)

export const subscriptionRoute = route