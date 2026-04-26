import express from "express";
import http from "http";
import routerAuth from "./routes/router.auth.js";

const app = express();
const server = http.createServer(app);
app.use(express.json());

/** ROUTERS **/
app.use("/auth", routerAuth);

export default server;
