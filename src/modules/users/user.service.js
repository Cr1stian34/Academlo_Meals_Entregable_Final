import { Meal } from "../meals/meal.model.js";
import { Order } from "../orders/order.model.js";
import { Restaurant } from "../restaurants/restaurant.model.js";
import { User } from "./user.model.js";


export class UserService {
    static async create(data){
        return await User.create(data)
    }

    static async findOneByEmail(email){
        return await User.findOne({
            where: {
                email: email,
                status: true
            }
        })
    }

    static async findOne(id){
        return await User.findOne({
            where: {
                id: id,
                status: true
            }
        })
    }

    static async updateProfile(user, data){
        return await user.update(data);
    }

    static async deleteUser(user){
        return await user.update({status: false})
    }

    static async findUserOrders(id){
        return await Order.findAll({
            where: {
                userId: id
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
}