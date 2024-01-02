import { catchAsync } from "../../common/errors/catchAsync.js"
import { validatePartialRestaurant, validateRestaurant } from "./restaurant.schema.js"
import { RestaurantService } from "./restaurant.service.js"
import { validatePartialReview, validateReview } from "./review.schema.js"


export const createRestaurant = catchAsync(async(req,res, next)=>{
    const {hasError, errorMessages, restaurantData} = validateRestaurant(req.body)
    
    if(hasError){
        return res.status(422).json({
            status: "error",
            message: errorMessages
        })
    }

    const restaurant = await RestaurantService.createRestaurante(restaurantData)

    return res.status(201).json(restaurant)
})
export const createReview = catchAsync(async(req,res, next)=>{
    const {id} = req.params
    const {sessionUser}= req
    const {hasError, errorMessages, reviewData} = validateReview(req.body)

    if(hasError){
        return res.status(422).json({
            status: "error",
            message: errorMessages
        })
    }

    const review = await RestaurantService.createReview({userId: sessionUser.id,comment: reviewData.comment, rating: reviewData.rating, restaurantId: id})
     
    return res.status(201).json(review) 
})

export const deleteReview = catchAsync(async(req,res, next)=>{
    const {review} = req;

    await RestaurantService.deleteReview(review);

    return res.status(204).json(null)
})

export const findAllRestaurants = catchAsync(async(req, res, next)=>{
    const restaurants = await RestaurantService.findAllRestaurants()

    return res.status(201).json(restaurants)
})

export const findOneRestaurant = catchAsync(async(req, res, next)=>{
    const {id} = req.params

    const restaurant = await RestaurantService.findOneRestaurant(id)

    return res.status(201).json(restaurant)
})

export const updateRestaurant = catchAsync(async(req, res, next)=>{
    const {restaurant}= req;

    const {hasError, errorMessages, restaurantData} = validatePartialRestaurant(req.body)

    if(hasError){
        return res.status(422).json({
            status: "error",
            message: errorMessages
        })
    }

    const restaurantUpdate = await RestaurantService.updateRestaurant(restaurant, restaurantData)

    return res.status(201).json(restaurantUpdate)
})

export const deleteRestaurant = catchAsync(async(req, res, next)=>{
    const {restaurant}= req;

    await RestaurantService.deleteRestaurant(restaurant)

    return res.status(204).json(null)
})

export const updateReview = catchAsync(async(req, res, next)=>{
    const {review} = req

    const {hasError, errorMessages, reviewData} = validatePartialReview(req.body)

    if(hasError){
        return res.status(422).json({
            status: "error",
            message: errorMessages
        })
    }

    const reviewUpdate = await RestaurantService.reviewUpdate(review, reviewData)

    return res.status(201).json(reviewUpdate)
})