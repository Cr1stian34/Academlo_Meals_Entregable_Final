import z from "zod"
import { extractValidationData } from "../../common/utils/extractErrorData.js";


const registerSchema = z.object({
    name: z.string({
        invalid_type_error: "must be a string",
        required_error: "name is require" 
    }),
    price: z.number().min(0, {message: "El precio no puede ser menor que cero"})
})

export function validateMeal(data){
    const result = registerSchema.safeParse(data);

    const {hasError, errorMessages, data: mealData } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        mealData
    }
}

export function validatePartialMeal(data){
    const result = registerSchema.partial().safeParse(data);

    const {hasError, errorMessages, data: mealData} = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        mealData
    }
}