import express from 'express';
import {
  createRestaurant,
  createReview,
  deleteRestaurant,
  deleteReview,
  findAllRestaurants,
  findOneRestaurant,
  updateRestaurant,
  updateReview,
} from './restaurant.controller.js';
import { protect, restrictTo } from '../users/user.middelware.js';
import {
  protectAccountOwner,
  validExistReview,
  validReviwRestaurant,
  validaExistRestaurant,
} from './restaurant.middleware.js';

export const router = express.Router();

router.route("/").get(findAllRestaurants) //LISTO
router.route("/:id").get(validaExistRestaurant,findOneRestaurant) //LISTO

router.use(protect); //LISTO

router.route('/').post(restrictTo("admin"),createRestaurant); //LISTO
router.route("/:id")
      .patch(restrictTo("admin"),validaExistRestaurant,updateRestaurant) //LISTO
      .delete(restrictTo("admin"),validaExistRestaurant,deleteRestaurant) //LISTO
      
router.post('/reviews/:id', validaExistRestaurant, createReview); //LISTO
router
  .route('/reviews/:restaurantId/:id')
  .patch( validaExistRestaurant, validExistReview, protectAccountOwner, validReviwRestaurant, updateReview) //LISTO
  .delete( validaExistRestaurant, validExistReview, protectAccountOwner, validReviwRestaurant,deleteReview); //LISTO
