import express from 'express';

const router = express.Router();
import userRouter from "./users.js";
import eventRouter from "./events.js";

router.use("/user", userRouter);
router.use("/user", eventRouter);

export default router;