import joi from "joi";

export default {

    createEvent: joi.object({
        title: joi.string().min(3).max(100).required(),
        description: joi.string().min(10).max(1000).required(),
        date: joi.date().iso().required(),
        location: joi.string().min(3).max(100).required(),
    }),
}