import { Meal } from "../meals/meal.model.js";
import { Restaurant } from "../restaurants/restaurant.model.js";
import { User } from "../users/user.model.js";
import { Order } from "./order.model.js";


export class OrderService{

    static async findOneMeal(id){
        return await Meal.findOne({
            where: {
                status: true,
                id: id
            }
        })
    }

    static async findOneOrder(id){
        return await Order.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude : ["createdAt", "updatedAt"]
            },
            include: {
                model: Meal,
                attributes: {
                    exclude : ["createdAt", "updatedAt"]
                },
                include: {
                    model: Restaurant,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            }
        })
    }

    static async create(data){
        return await Order.create(data)
    }

    static async findOneOrderActive(id){
        return await Order.findOne({
            where: {
                status: "active",
                id: id
            },
            include: {
                model: User
            }
        })
    }

    static async updateOrder(order){
        return await order.update({status: "completed"})
    }

    static async deleteOrder(order){
        return await order.update({status: "cancelled"})
    }

    static async findAllOrdersUser(userId){
        return await Order.findAll({
            where: {
                status: "active",
                userId: userId
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include:{
                model: Meal,
                attributes: ["name", "price", "restaurantId"],
                include: {
                    model: Restaurant,
                    attributes: {exclude: ["status", "createdAt", "updatedAt"]}
                }
            }
        })
    }
}