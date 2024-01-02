import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { MealService } from "./meal.service.js";


export const validateExistMeal = catchAsync(async(req, res, next)=>{
    const {id} = req.params;

    const meal = await MealService.findOneMeal(id)

    if(!meal){
        return next(new AppError(`Meal with id: ${id} not found`, 404))
    }
 
    req.meal= meal;
    next()
})