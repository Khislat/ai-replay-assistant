import { type Request, type Response } from "express";
import type { T } from "../libs/types/common.js";
import TelegramService from "../services/telegram.service.js";
import AiService from "../services/ai.service.js";

const webhookController: T = {};
const telegramService = new TelegramService();
const aiService = new AiService();

webhookController.handleWebhook = async (req: Request, res: Response) => {
	console.log(req.body);

	const parsed = telegramService.parseMessage(req.body);

	if (!parsed) {
		return res.send("ok");
	}

	const aiReply = await aiService.generateReply(parsed.text);
	await telegramService.sendMessage(parsed.chatId, aiReply);

	res.send("ok");
};

export default webhookController;
