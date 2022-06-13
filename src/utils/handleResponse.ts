/*
 * @Description: 响应处理器
 * @Author: Sunly
 * @Date: 2022-06-08 16:33:32
 */
import type { Response } from "express";

class BaseResponse {
  res: Response;
  code: number;
  httpCode: number;
  data: string | object;
  message: string;
  constructor(
    res: Response,
    code: number,
    httpCode: number,
    message: string,
    data: string | object
  ) {
    this.res = res;
    this.code = code;
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }
  send() {
    this.res.status(this.httpCode).json({
      code: this.code,
      httpCode: this.httpCode,
      message: this.message,
      data: this.data,
    });
  }
}

class SuccessResponse extends BaseResponse {
  constructor(res: Response, data: string | object, message = "请求成功") {
    super(res, 0, 200, message, data);
    this.send();
  }
}

class ErrorResponse extends BaseResponse {
  constructor(
    res: Response,
    message: string,
    code = -1,
    httpCode = 500,
    data = {}
  ) {
    super(res, code, httpCode, message, data);
    this.send();
  }
}

export { SuccessResponse, ErrorResponse };
