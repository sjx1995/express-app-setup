/*
 * @Description: 登陆相关路由
 * @Author: Sunly
 * @Date: 2022-06-09 15:48:20
 */
import { Router } from "express";
import { validateLoginForm } from "../validators/login.validators";
import { verifyLogin } from "../controllers/login.controller";
import { createToken } from "../utils/jwt";
import { globalLogger } from "../utils/log";
import { SuccessResponse, ErrorResponse } from "../utils/handleResponse";

const router = Router();

/**
 *
 * @api {post} /login 登录
 * @apiName 登录
 * @apiGroup 登录
 * @apiDescription 登录
 * @apiVersion 1.0.0
 *
 * @apiParam (body) {Object} data 登录信息
 * @apiParam (body) {String} data.username 用户名
 * @apiParam (body) {String} data.password 密码
 *
 * @apiSuccess {Number} code 200
 * @apiSuccess {Object} data 登陆成功信息
 * @apiSuccess {String} data.token token
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *    token: "xxx"
 * }
 */
router.post("/", async (req, res) => {
  try {
    const loginForm = req.body as { username: string; password: string };
    const [isValidate, validateErrMsg] = await validateLoginForm(loginForm);
    if (!isValidate) {
      throw new Error(validateErrMsg);
    }
    const [isLoginSuc, verifyErrMsg] = await verifyLogin(loginForm);
    if (!isLoginSuc) {
      throw new Error(verifyErrMsg);
    }
    const token = createToken(loginForm.username);
    return new SuccessResponse(res, { token });
  } catch (e: any) {
    globalLogger.error(e);
    return new ErrorResponse(
      res,
      typeof e.message === "string" ? e.message : "登陆失败"
    );
  }
});

export default router;
