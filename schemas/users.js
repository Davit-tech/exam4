import joi from "joi";

export default {
    register: joi.object({
        userName: joi.string().min(3).max(50).required(),
        email: joi.string().email().required(),
        password: joi.string().min(3).max(50).required(),
    }),
    activate: joi.object({
        token: joi.string().required(),
    }),
    login: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),


};