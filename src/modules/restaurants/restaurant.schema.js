import z from "zod"
import { extractValidationData } from "../../common/utils/extractErrorData.js"

const resgisterSchema = z.object({
    name: z.string({
        invalid_type_error: "name must be a string",
        required_error: "name is required"
    })
    .min(3, {message: "name is to short"})
    .max(50, {message: "name is to long"}),
    address: z.string({
        invalid_type_error: "name must be a string",
        required_error: "name is required"
    }),
    rating: z.number({
        invalid_type_error: "must be a number",
        required_error: "rating required"
    })
    .min(1, {message: "el valor no puede ser menor que 1"})
    .max(5, {message: "el valor no puede ser mayor que 5"})
})

export function validateRestaurant(data){
    const result = resgisterSchema.safeParse(data)

    const {hasError, errorMessages, data: restaurantData} = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        restaurantData
    }
}

export function validatePartialRestaurant(data){
    const result = resgisterSchema.partial().safeParse(data)

    const {hasError, errorMessages, data: restaurantData} = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        restaurantData
    }
}