import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
class TelegramService {
	public parseMessage(update: any) {
    if (!update.message) return null;
		const userId = update.message.from.id;
		const chatId = update.message.chat.id;
		const text = update.message.text;

		const result = { userId, chatId, text };

		return result;
	}

	public async sendMessage(chatId: number, text: string) {
		const api = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
		await axios.post(api, {
			chat_id: chatId,
			text: text,
		});
	}
}

export default TelegramService;
