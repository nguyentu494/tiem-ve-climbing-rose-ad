import z from "zod";

export const LoginRequestSchema = z.object({
    username: z.string().min(1, "Tên đăng nhập không được để trống"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;