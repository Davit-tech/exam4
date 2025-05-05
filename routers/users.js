import express from 'express';
import schemas from "../schemas/users.js";
import validate from "../middlewares/validation.js";

const router = express.Router();
import userController from '../controllers/usersControllers.js';


router.get("/activate", validate(schemas.activate, "query"), userController.activate);
router.post("/login", validate(schemas.login, "body"), userController.login);
router.post("/register", validate(schemas.register, "body"), userController.register);

export default router;