import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { envs } from "../../config/enviroments/enviroments.js";
import { UserService } from "./user.service.js";
import {promisify} from "util"
import jwt from "jsonwebtoken";

export const validateExistUser = catchAsync(async(req, res, next)=>{
    const {id} = req.params;

    const user = await UserService.findOne(id);

    if(!user){
        return next(new AppError(`user with id: ${id} not found`, 404))
    }

    req.user = user
    next()
})

export const protect = catchAsync(async(req, res, next)=>{
    //1. obtener el token
    let token
  
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
  
    // console.log(token)
    //2. validar si el token existe
    if(!token){
      return next(new AppError("You are not loggin in!. Please login to get access",401))
    }
    //3. decodificar el token
    //esta es una forma de convertir una funcion que devuelve un callback a una funcion promesa// de callback a promesa
    const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED)
  
    // console.log(decoded)
    //4. buscar el usuario dueño del token y validar si existe
    const user = await UserService.findOne(decoded.id)
    
    if(!user){
      return next(new AppError("The owner of this token is not longer available",401))
    }
    //5. validar si el usuario cambio la contraseña recientemente, si es asi enviar un error
  
    //6. Adjuntar el usuario en sesion, el usuario en sesion es el usuario dueño del token
    req.sessionUser = user //importante
    // console.log(user.id)
    next()
  })

  export const protectAccountOwner = (req, res, next)=>{
    const {user, sessionUser} = req;
  
    if(user.id !== sessionUser.id){
      return next(new AppError("You do not own this account",401))
    }
  
    next();
  }
  
  // un spreed operation "...rol" toma todo lo que se venga
  export const restrictTo = (...rol)=>{
    return (req, res, next)=>{
      if(!rol.includes(req.sessionUser.role)){
        return next(new AppError("You do not have permision to performe this action", 403))
      }
  
      next()
    }
  }
  