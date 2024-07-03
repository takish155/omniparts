import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "invalidPasswordError" })
      .max(20, { message: "invalidPasswordError" }),
    newPassword: z
      .string()
      .min(6, { message: "minPasswordError" })
      .max(20, { message: "maxPasswordError" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "passwordMismatchError",
    path: ["confirmPassword"],
  });

export type UpdatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;
export type UpdatePasswordErrors =
  | "invalidPasswordError"
  | "minPasswordError"
  | "maxPasswordError"
  | "passwordMismatchError";
