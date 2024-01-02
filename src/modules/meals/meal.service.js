import { Restaurant } from "../restaurants/restaurant.model.js";
import { Meal } from "./meal.model.js";


export class MealService{

    static async create(data){
        return await Meal.create(data)
    }

    static async findAllMeals(){
        return await Meal.findAll({
            where: {
                status: true
            },
            include: {
                model: Restaurant,
                attributes: {
                    exclude: ["status", "createdAt", "updatedAt"]
                }
            }
        })
    }

    static async findOneMeal(id){
        return await Meal.findOne({
            where: {
                status: true,
                id: id
            }
        })
    }

    static async updateMeal(meal, mealData){
        return await meal.update(mealData)
    }

    static async deleteMeal(meal){
        return await meal.update({status: false})
    }
}