import { catchAsync } from "../../common/errors/catchAsync.js"
import { validateMeal, validatePartialMeal } from "./meal.schema.js";
import { MealService } from "./meal.service.js";

export const findAllMeals = catchAsync(async(req, res, next)=>{
    const meals = await MealService.findAllMeals()

    return res.status(201).json(meals)
})
export const createMeal = catchAsync(async(req, res, next)=>{
    const {id} = req.params;
    
    const {hasError, errorMessages, mealData} = validateMeal(req.body)
    
    if(hasError){
        return res.status(422).json({
            status: "error",
            message: errorMessages
        })
    }

    const meal = await MealService.create({name: mealData.name, price: mealData.price, restaurantId: id})

    return res.status(201).json(meal)
})
export const findOneMeal = catchAsync(async(req, res, next)=>{
    const {meal}= req

    return res.status(201).json(meal)
})
export const updateMeal = catchAsync(async(req, res, next)=>{
    const {meal}= req
    const {hasError, errorMessages, mealData} = validatePartialMeal(req.body)

    if(hasError){
        return res.status(422).json({
            status: "fail",
            message: errorMessages
        })
    }

    const updateMeal = await MealService.updateMeal(meal, mealData)

    return res.status(201).json(updateMeal)
})

export const deleteMeal = catchAsync(async(req, res, next)=>{
    const {meal}= req

    await MealService.deleteMeal(meal)

    return res.status(204).json(null)
})