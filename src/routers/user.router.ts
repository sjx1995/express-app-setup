/*
 * @Description: 用户相关路由
 * @Author: Sunly
 * @Date: 2022-06-08 14:56:05
 */
import { Router } from "express";
import { validateUserId } from "../validators/user.validator";
import { getUserInfo } from "../controllers/user.controller";
import { SuccessResponse, ErrorResponse } from "../utils/handleResponse";

const router = Router();

/**
 *
 * @api {get} /user/username/:username 获取用户信息
 * @apiName 获取用户信息
 * @apiGroup 用户
 * @apiDescription 返回用户信息
 * @apiVersion 1.0.0
 *
 * @apiParam (query) {String} username 用户名
 *
 * @apiSuccess {Number} code 200
 * @apiSuccess {Object} data 用户名对象
 * @apiSuccess {Number} data.id ID
 * @apiSuccess {String} data.username 用户名
 * @apiSuccess {Number} data.age 用户年龄
 * @apiSuccess {String} [data.email] 用户邮箱
 * @apiSuccess {String} data.createdAt 注册时间
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    id: 1,
 *    username: "sunly",
 *    age: 20,
 *    email: "i@sunly.in",
 *    createdAt: "2022-06-08T11:51:06.064Z"
 * }
 */

router.get("/username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const [isValidate, errMessage] = await validateUserId(username);
    if (!isValidate) {
      throw new Error(errMessage);
    }
    const [getUserSuc, userInfo] = await getUserInfo(username);
    if (!getUserSuc || userInfo == null) {
      throw new Error((userInfo as string | null) || "");
    }
    return new SuccessResponse(res, userInfo);
  } catch (e: any) {
    return new ErrorResponse(
      res,
      typeof e.message === "string" ? e.message : "获取用户信息失败"
    );
  }
});

export default router;
