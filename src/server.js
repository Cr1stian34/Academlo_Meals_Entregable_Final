import app from "./app.js";
import { initModel } from "./config/database/associations.js";
import { authenticated, syncd } from "./config/database/database.js";
import { envs } from "./config/enviroments/enviroments.js";

async function main() {
    try {
        await authenticated()
        initModel()
        await syncd()
        //por si deseas inicializar una bd
    } catch (error) {
        console.error(error);
    }
}

main();

app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
});
