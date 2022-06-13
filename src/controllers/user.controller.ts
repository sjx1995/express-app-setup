/*
 * @Description: 用户相关数据
 * @Author: Sunly
 * @Date: 2022-06-08 19:33:39
 */
import { prisma } from "../utils/prisma";
import { globalLogger } from "../utils/log";
import { User } from "@prisma/client";

const getUserInfo = async (
  username: string
): Promise<[boolean, string | Omit<User, "password"> | null]> => {
  try {
    const userInfo = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        age: true,
        email: true,
        createdAt: true,
      },
    });
    return [true, userInfo];
  } catch (e: any) {
    globalLogger.error(e);
    return [false, "查询用户信息失败"];
  }
};

export { getUserInfo };
