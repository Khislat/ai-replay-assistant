import express from "express";
import http from "http";
import routerAuth from "./routes/router.auth.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();
const server = http.createServer(app);
app.use(express.json());

/** ROUTERS **/
app.use("/auth", routerAuth);

app.use(errorMiddleware);

export default server;
