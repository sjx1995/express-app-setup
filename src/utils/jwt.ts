/*
 * @Description: 身份验证
 * @Author: Sunly
 * @Date: 2022-06-09 15:18:07
 */
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import { ErrorResponse } from "./handleResponse";
import { globalLogger } from "./log";

import type { Request, Response, NextFunction } from "express";

const createToken = (username: string): string => {
  const cert = fs.readFileSync(
    path.resolve(__dirname, "../config/private.key"),
    { encoding: "utf-8" }
  );
  const token = jwt.sign(
    {
      username,
    },
    cert,
    {
      algorithm: "RS256",
      expiresIn: "24h",
    }
  );
  return token;
};

const verifyToken = (token: string) => {
  try {
    const cert = fs.readFileSync(
      path.resolve(__dirname, "../config/public.key"),
      {
        encoding: "utf-8",
      }
    );
    jwt.verify(token, cert);
    return true;
  } catch (e: any) {
    globalLogger.error(e);
    return false;
  }
};

const verifyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const urls = req.url.split("/");
  if (urls[urls.length - 1] !== "login") {
    const token = req.headers?.authorization?.split(" ")[1] || "";
    const verifyRes = verifyToken(token);
    if (verifyRes) {
      return next();
    }
    return new ErrorResponse(res, "身份验证失败", -1, 403);
  }
  next();
};

export { createToken, verifyMiddleware };
