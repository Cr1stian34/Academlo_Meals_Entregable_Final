import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { verifyPassword } from '../../config/plugins/encripted-password.js';
import { generateJWT } from '../../config/plugins/generate-jwt.plugin.js';
import { validateLogin, validatePartialUser, validateUser } from './user.schema.js';
import { UserService } from './user.service.js';

export const registerUser = catchAsync(async (req, res, next) => {
    // los pasos para hacer un registro de usuario
    const {hasError, errorMessages, userData} = validateUser(req.body)
    if(hasError){
        return res.status(422).json({
            status: "error",
            message: errorMessages
        })
    }

    const user = await UserService.create(userData)
    const token = await generateJWT(user.id)

    return res.status(201).json({
        token: token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});

export const login = catchAsync(async (req, res, next) => {
    // todos los pasos para verificar el login y realizarlo
    
    const {hasError, errorMessages, userData} = validateLogin(req.body)

    if(hasError){
        return res.status(422).json({
            status: "error",
            message: errorMessages
        })
    }
    
    const user = await UserService.findOneByEmail(userData.email);

    if(!user){
        return next(new AppError("This account does not exist", 404))
    }

    const isCorrectPassword = await verifyPassword(userData.password, user.password)

    if(!isCorrectPassword){
        return next(new AppError("Incorrect email or password", 401))
    }

    const token = await generateJWT(user.id)

    return res.status(201).json({
        token: token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
});

export const updateProfile = catchAsync(async (req, res, next) => {
    const { user }= req;

    const {hasError, errorMessages, userData} = validatePartialUser(req.body)

    if(hasError){
        return res.status(422).json({
            status: "error",
            message: errorMessages
        })
    }
    
    const userUpdate = await UserService.updateProfile(user, userData)
    return res.status(201).json(userUpdate)
});

export const deleteUser = catchAsync(async (req, res, next) => {
    const {user} = req;

    await UserService.deleteUser(user);

    return res.status(204).json(null)
});

export const findUserOrders = catchAsync(async (req, res, next) => {
    const {sessionUser} = req
    
    const user = await UserService.findUserOrders(sessionUser.id)
    return res.status(201).json(user)
});

export const findOneOrder = catchAsync(async (req, res, next) => {
    const {order, sessionUser}= req; 
    
    if(order.userId !== sessionUser.id){
        return next(new AppError("Esta orden no le pertenece a este usuario",401))
    }

    return res.status(201).json(order)
});
