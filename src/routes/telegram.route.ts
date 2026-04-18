import express from "express";
const telegramRouter = express.Router();
import webhookController from "../controllers/telegram.controller.js";

telegramRouter.post("/webhook", webhookController.handleWebhook);

export default telegramRouter;
