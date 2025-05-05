import express from 'express';
import auth from "../middlewares/auth.js";

const router = express.Router();
import fileUpload from "../middlewares/fileUpload.js";

import schemas from "../schemas/events.js";
import validate from "../middlewares/validation.js";

import eventController from "../controllers/eventsControllers.js";

router.post("/events", auth, validate(schemas.createEvent, "body"), fileUpload.single("image"), eventController.createEvent)
router.get("/events/data", auth, eventController.getAllEvents)
router.get("/myEvents", auth, eventController.getMyEvents)
router.put("/events/:eventId", auth, validate(schemas.createEvent, "body"), eventController.updateEvent);


export default router;