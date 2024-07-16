import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "minPasswordError" })
      .max(20, { message: "maxPasswordError" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwordMismatchError",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export type ResetPasswordErrors =
  | "minPasswordError"
  | "maxPasswordError"
  | "passwordMismatchError";
