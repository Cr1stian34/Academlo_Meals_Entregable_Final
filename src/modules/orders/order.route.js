import express from "express"
import { createOrder, deleteOrder, getAllOrders, orderCompleted } from "./order.controller.js"
import { protectAccountOwner, validExistMealOrder, validOrderActive } from "./order.middleware.js"
import { protect } from "../users/user.middelware.js"

export const router = express.Router()

router.use(protect)
router.post("/",validExistMealOrder,createOrder)
router.get("/me", getAllOrders)

router.route("/:id")
      .patch(validOrderActive, protectAccountOwner, orderCompleted)
      .delete(validOrderActive, protectAccountOwner, deleteOrder)