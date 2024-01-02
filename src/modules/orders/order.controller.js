import { catchAsync } from "../../common/errors/catchAsync.js"
import { validateOrder } from "./order.schema.js"
import { OrderService } from "./order.service.js"



export const createOrder = catchAsync(async(req, res, next)=>{
    const {meal,sessionUser}= req
    const {hasError, errorMessages, orderData} = validateOrder(req.body)

    if(hasError){
        return res.status(422).json({ 
            status: "error",
            message: errorMessages
        })
    }

    let totalPrice = meal.price * orderData.quantity

    const order = await OrderService.create({mealId: orderData.mealId, userId: sessionUser.id, totalPrice: totalPrice, quantity: orderData.quantity})

    return res.status(201).json(order)
})
export const getAllOrders = catchAsync(async(req, res, next)=>{
    const {sessionUser} = req
    const orders = await OrderService.findAllOrdersUser(sessionUser.id)

    return res.status(201).json(orders)
})
export const orderCompleted = catchAsync(async(req, res, next)=>{
    const {order} = req

    const orderUpdate = await OrderService.updateOrder(order)

    return res.status(201).json(orderUpdate)
})
export const deleteOrder = catchAsync(async(req, res, next)=>{
    const {order} = req;

    await OrderService.deleteOrder(order)

    return res.status(204).json(null)
})