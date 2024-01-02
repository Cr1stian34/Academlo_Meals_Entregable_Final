import express from "express"
import { deleteUser, findOneOrder, findUserOrders, login, registerUser, updateProfile } from "./user.controller.js";
import { protect, protectAccountOwner, validateExistUser } from "./user.middelware.js";
import { validExistOrder } from "../orders/order.middleware.js";

export const router = express.Router();

router.post("/signup", registerUser) //LISTO
router.post("/login", login) //LISTO

router.use(protect);
router.patch("/:id", validateExistUser , protectAccountOwner, updateProfile) //LISTO
router.delete("/:id", validateExistUser ,protectAccountOwner,deleteUser) //LISTO
router.get("/orders", findUserOrders)  //pendiente
router.get("/orders/:id", validExistOrder, findOneOrder) //pendiente //tine que ser validExistOrder

