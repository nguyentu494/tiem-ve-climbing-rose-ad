import z from "zod";
import { UserSchema } from "./UserResponse";

export const LoginDataSchema = z.object({
  token: z.string(),
  authenticated: z.boolean(),
  user: UserSchema,
});

export type LoginDataResponse = z.infer<typeof LoginDataSchema>;
