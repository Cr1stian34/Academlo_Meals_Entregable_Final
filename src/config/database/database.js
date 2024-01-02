import { Sequelize } from "sequelize";
import { envs } from "../enviroments/enviroments.js";

export const sequelize = new Sequelize(envs.DB_URL, {
    logging: false
})

export const authenticated = async()=>{
    try {
        await sequelize.authenticate();
        console.log("The database has been conected :)")
    } catch (error) {
        console.log(error)
    }
}

export const syncd = async()=>{
    try {
        await sequelize.sync();
        console.log("The database has been synced ;)")
    } catch (error) {
        console.log(error)
    }
}

