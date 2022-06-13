/*
 * @Description: 创建日志
 * @Author: Sunly
 * @Date: 2022-06-08 15:35:46
 */
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import path from "path";
import process from "process";

const { printf, timestamp, combine, errors, align } = format;

const globalLogFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  align(),
  errors({ stack: true }),
  printf((info) => `[${info.level}] ${info.timestamp} ${info.message}`)
);

const defaultOption = {
  format: globalLogFormat,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "60d",
};

const globalLogger = createLogger({
  format: globalLogFormat,
  transports: [
    new transports.DailyRotateFile({
      filename: path.resolve(process.cwd(), "logs", "info-%DATE%.log"),
      level: "info",
      ...defaultOption,
    }),
  ],
});

export { globalLogger };
