import {Users, Events, UserEvents} from "./models/index.js";


(async () => {
    const models = [Users, Events, UserEvents];

    for (const model of models) {
        console.warn("Migrate", model.name);

        await model.sync({alter: true});
        try {
            await model.createDefaults();
        } catch (error) {
            console.error(error);
        }
    }

})();
