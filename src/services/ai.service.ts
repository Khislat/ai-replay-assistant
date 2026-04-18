import axios from "axios";
import "dotenv/config";

const API_KEY = process.env.OPENROUTER_API_KEY;

class AiService {
	public async generateReply(userMessage: string): Promise<string> {
		const response = await axios.post(
			"https://openrouter.ai/api/v1/chat/completions",
			{
				model: "openrouter/free",
				messages: [{ role: "user", content: userMessage }],
			},
			{
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					"Content-Type": "application/json",
					"HTTP-Referer": "http://localhost:3000",
					"X-Title": "telegram-ai-bot",
				},
			}
		);

		const text =
			response.data?.choices?.[0]?.message?.content || "No AI response";

		return text;
	}
}

export default AiService;
