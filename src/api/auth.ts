import { api } from "src/lib/axios";
import { LocalStorage } from "src/lib/local-storage";
import { LoginRequestSchema } from "src/types/request/LoginRequest";
import { BaseResponseSchema } from "src/types/response/BaseResponse";
import { LoginDataSchema } from "src/types/response/LoginResponse";
import { z } from "zod";

const LoginResponseSchema = BaseResponseSchema(LoginDataSchema);

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const Login = async (
  values: z.infer<typeof LoginRequestSchema>
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", values);

  const parsed = LoginResponseSchema.parse(response.data);

  if(parsed.statusCode === 200) {
    localStorage.setItem(LocalStorage.token, parsed.data.token);
    localStorage.setItem(LocalStorage.userId, JSON.stringify(parsed.data.user.userId));
  }

  return parsed;
};
