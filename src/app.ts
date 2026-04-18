import express from "express";
import http from "http";
import telegramRouter from "./routes/telegram.route.js";


const app = express();
const server = http.createServer(app);
app.use(express.json());

/** ROUTERS **/
app.use("/telegram", telegramRouter);

export default server;
