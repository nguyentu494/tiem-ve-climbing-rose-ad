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
  localStorage.removeItem(LocalStorage.token);

  const response = await api.post("/auth/login", values);

  const parsed = LoginResponseSchema.parse(response.data);

  if(parsed.statusCode === 200) {
    localStorage.setItem(LocalStorage.token, parsed.data.token);
    localStorage.setItem(LocalStorage.userId, JSON.stringify(parsed.data.user.userId));
  }

  return parsed;
};

const Logout = async (): Promise<void> => {
  const token = localStorage.getItem(LocalStorage.token);
  if (!token) return;

  try {
    await api.post("/auth/logout", { token }); // Gửi dạng request body JSON
  } catch (err) {
    console.error("Logout failed:", err);
  } finally {
    localStorage.removeItem(LocalStorage.token);
    localStorage.removeItem(LocalStorage.userId);
  }
};

