import z from "zod";

export const UserSchema = z.object({
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  userId: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  username: z.string(),
  displayName: z.string(),
  avatar: z.string().nullable(),
  dob: z.string().nullable(),
  status: z.string().nullable(),
  zipcode: z.string(),
  addressDetail: z.string(),
  contact: z.string().nullable(),
  role: z.enum(["ADMIN", "USER"]).or(z.string()), // fallback nếu có role khác
  active: z.boolean(),
});

export type UserResponse = z.infer<typeof UserSchema>;
