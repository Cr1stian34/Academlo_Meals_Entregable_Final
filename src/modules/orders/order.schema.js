import z from "zod"
import { extractValidationData } from "../../common/utils/extractErrorData.js"

const resgisterSchema = z.object({
    mealId: z.number({
        invalid_type_error: "must be a number",
        required_error: "mealId is required"
    }),
    quantity: z.number({
        invalid_type_error: "must be a number integer",
        required_error: "quantity is required"
    })
})

export function validateOrder(data){
    const result = resgisterSchema.safeParse(data)

    const {hasError, errorMessages, data: orderData} = extractValidationData(result)

    return {
        hasError,
        errorMessages, 
        orderData
    }
}

export function validatePartialOrder(data){
    const result = resgisterSchema.partial().safeParse(data)

    const {hasError, errorMessages, data: orderData} = extractValidationData(result)

    return {
        hasError,
        errorMessages, 
        orderData
    }
}