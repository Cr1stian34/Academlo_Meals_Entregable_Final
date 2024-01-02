import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { RestaurantService } from './restaurant.service.js';

export const validaExistRestaurant = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;

  let resId = restaurantId || id;

  const restaurant = await RestaurantService.findOneRestaurant(resId);

  if(!restaurant){
    return next(new AppError(`Restaurant with id: ${resId} not found`))
  }

  req.restaurant = restaurant;
  next();
});

export const validExistReview = catchAsync(async(req, res, next)=>{
   const {id} = req.params

   const review = await RestaurantService.findOneReview(id)

   if(!review){
    return next(new AppError("Review not found", 404))
   }

   req.review = review;
   req.user = review.user
   next()
})

export const protectAccountOwner = (req, res, next)=>{
  const {user, sessionUser} = req;
  
  if(user.id !== sessionUser.id){
    return next(new AppError("You do not own this account", 401))
  }

  next();
};

export const validReviwRestaurant = catchAsync(async(req,res,next)=>{
  const {restaurant, review}= req

  if(restaurant.id !== review.restaurantId){
    return next(new AppError("Esta reseña no le pertenece a este restaurante", 401))
  }

  next()
})