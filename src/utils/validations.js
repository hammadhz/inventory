import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username cannot be empty")
    .regex(
      /^[\w!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]+$/,
      "Invalid characters in username"
    ),
  password: z
    .string()
    .min(1, "Password cannot be empty")
    .regex(
      /^[\w!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]+$/,
      "Invalid characters in password"
    ),
});
