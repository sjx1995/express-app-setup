/*
 * @Description: 登陆相关验证
 * @Author: Sunly
 * @Date: 2022-06-09 18:01:13
 */
import { object, string } from "yup";
import { globalLogger } from "../utils/log";

const validateLoginForm = async (loginForm: {
  username: string;
  password: string;
}): Promise<[boolean, string]> => {
  try {
    const schema = object().shape({
      username: string().required().min(4),
      password: string().required().min(6),
    });
    await schema.validate(loginForm);
    return [true, ""];
  } catch (e: any) {
    globalLogger.error(e);
    return [false, "用户名或密码不合法"];
  }
};

export { validateLoginForm };
