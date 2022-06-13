/*
 * @Description: 用户相关验证
 * @Author: Sunly
 * @Date: 2022-06-08 18:03:00
 */
import { string } from "yup";
import { globalLogger } from "../utils/log";

const validateUserId = async (id: string): Promise<[boolean, string]> => {
  try {
    const schema = string().required().min(4);
    await schema.validate(id);
    return [true, ""];
  } catch (e: any) {
    globalLogger.error(e);
    return [false, "用户名不能小于四个字符"];
  }
};

export { validateUserId };
