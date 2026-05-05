import "dotenv/config";
import server from "./app.js";
import logger from "./utils/logger.js";

const PORT = 3000;

server.listen(PORT, () => {
	logger.info(
		`AI Telegram Bot Server Running on port http://localhost:${PORT}`
	);
});
