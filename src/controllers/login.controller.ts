/*
 * @Description: 登陆相关控制
 * @Author: Sunly
 * @Date: 2022-06-09 15:49:56
 */
import { prisma } from "../utils/prisma";
import { AES, enc } from "crypto-js";
import { salt } from "../config";
import { globalLogger } from "../utils/log";

const { decrypt } = AES;

const verifyLogin = async (loginForm: {
  username: string;
  password: string;
}): Promise<[boolean, string]> => {
  try {
    const { username, password } = loginForm;
    const userInfo = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!userInfo) {
      throw new Error("找不到用户");
    }
    const decoded = decrypt(userInfo.password, salt).toString(enc.Utf8);
    if (password !== decoded) {
      throw new Error("密码错误");
    }
    return [true, "登陆成功"];
  } catch (e: any) {
    globalLogger.error(e);
    return [false, (e.message as string) || "登陆失败"];
  }
};

export { verifyLogin };
