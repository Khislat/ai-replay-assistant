import "dotenv/config";
import server from "./app.js";
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`AI Telegram Bot Server Running on port http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map