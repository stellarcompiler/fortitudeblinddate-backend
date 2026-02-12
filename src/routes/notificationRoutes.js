import express from "express";
import { notifyUser } from "../controller/notificationController.js";

const router = express.Router();

router.post("/notify", notifyUser);

export default router;
