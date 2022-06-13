/*
 * @Description: 主入口
 * @Author: Sunly
 * @Date: 2022-06-08 14:43:39
 */
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import process from "process";
import { globalLogger } from "./utils/log";
import { verifyMiddleware } from "./utils/jwt";

import loginRouter from "./routers/login.router";
import userRouter from "./routers/user.router";

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  globalLogger.info(req.url);
  next();
});

app.use(verifyMiddleware);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ strict: false }));

app.use("/apidoc", express.static(path.resolve(process.cwd(), "apidoc")));

app.use("/login", loginRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("server is running on 3000");
});
