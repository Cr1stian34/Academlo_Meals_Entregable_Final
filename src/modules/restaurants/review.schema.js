import z from "zod"
import { extractValidationData } from "../../common/utils/extractErrorData.js"

const resgisterSchema = z.object({
    comment: z.string({
        invalid_type_error: "name must be a string",
        required_error: "comment is required"
    }),
    rating: z.number({
        invalid_type_error: "name must be a number",
        required_error: "rating is required"
    })
    .min(1, {message: "el valor no puede ser menor que 1"})
    .max(5, {message: "el valor no puede ser mayor que 5"})
              
})

export function validateReview(data){
    const result = resgisterSchema.safeParse(data)

    const {hasError, errorMessages, data: reviewData} = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        reviewData
    }
}

export function validatePartialReview(data){
    const result = resgisterSchema.partial().safeParse(data)

    const {hasError, errorMessages, data: reviewData} = extractValidationData(result);

    return {
        hasError,
        errorMessages, 
        reviewData
    }
}