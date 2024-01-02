import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { OrderService } from "./order.service.js";



export const validExistMealOrder = catchAsync(async(req, res, next)=>{
    const {mealId} = req.body

    const meal = await OrderService.findOneMeal(mealId)

    if(!meal){
        return next(new AppError(`Meal with id: ${mealId} not found`, 404))
    }
    
    req.meal = meal
    next()
})

export const validExistOrder = catchAsync(async(req, res, next)=>{
    const {id} = req.params

    const order = await OrderService.findOneOrder(id)

    if(!order){
        return next(new AppError(`Order with id: ${id} not found`, 404))
    }

    req.order = order
    next()
})

export const validOrderActive = catchAsync(async(req, res, next)=>{
    const {id} = req.params

    const order = await OrderService.findOneOrderActive(id)

    if(!order){
        return next(new AppError(`Order with id: ${id} not found or status not is active`, 404))
    }

    req.order = order
    req.user = order.user
    next()
})

export const protectAccountOwner = (req, res, next)=>{
    const {user, sessionUser} = req;
  
    if(user.id !== sessionUser.id){
      return next(new AppError("You do not own this account",401))
    }
  
    next();
  }