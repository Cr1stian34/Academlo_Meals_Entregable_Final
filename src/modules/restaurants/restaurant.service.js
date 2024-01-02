import { User } from "../users/user.model.js";
import { Restaurant } from "./restaurant.model.js";
import { Review } from "./review.model.js";


export class RestaurantService {
    static async createRestaurante(data){
        return await Restaurant.create(data)
    }

    static async findOneRestaurant(id){
        return await Restaurant.findOne({
            where: {
                id: id,
                status: true
            }
        })
    }

    static async createReview(data){
        return await Review.create(data)
    }

    static async findOneReview(id){
        return await Review.findOne({
            where: {
                id: id,
                status: true
            },
            include: [
                {
                    model: User
                }
            ]
        })
    }

    static async reviewUpdate(review, data){
        return await review.update(data)
    }

    static async deleteReview(review){
        return await review.update({status: false})
    }

    static async findAllRestaurants(){
        return await Restaurant.findAll({
            where: {
                status: true
            }
        })
    }

    static async updateRestaurant(restaurant, data){
        return await restaurant.update(data)
    }

    static async deleteRestaurant(restaurant){
        return await restaurant.update({status: false})
    }
}