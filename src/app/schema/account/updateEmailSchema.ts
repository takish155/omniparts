import { z } from "zod";

export const updateEmailSchema = z.object({
  newEmail: z
    .string()
    .email({ message: "invalidEmailError" })
    .max(50, { message: "invalidEmailError" }),
  password: z
    .string()
    .min(6, { message: "invalidPasswordError" })
    .max(20, { message: "invalidPasswordError" }),
});

export type UpdateEmailSchemaType = z.infer<typeof updateEmailSchema>;
export type UpdateEmailErrors = "invalidEmailError" | "invalidPasswordError";
