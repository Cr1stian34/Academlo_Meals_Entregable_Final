import express from "express"
import { createMeal, deleteMeal, findAllMeals, findOneMeal, updateMeal } from "./meal.controller.js"
import { validaExistRestaurant } from "../restaurants/restaurant.middleware.js"
import { validateExistMeal } from "./meal.middleware.js"
import { protect, restrictTo } from "../users/user.middelware.js"

export const router = express.Router()


router.route("/").get(findAllMeals) //LISTO
router.get("/:id", validateExistMeal, findOneMeal)

router.use(protect)
router.route("/:id")
      .post(restrictTo("admin"),validaExistRestaurant,createMeal) //LISTO
      .patch(restrictTo("admin"),validateExistMeal,updateMeal) //LISTO
      .delete(restrictTo("admin"),validateExistMeal,deleteMeal) // LISTO

