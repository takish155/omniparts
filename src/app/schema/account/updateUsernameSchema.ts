import { z } from "zod";

export const updateUsernameSchema = z.object({
  newUsername: z
    .string()
    .min(3, { message: "minUsernameError" })
    .max(10, { message: "maxUsernameError" }),
  password: z
    .string()
    .min(6, { message: "invalidPasswordError" })
    .max(20, { message: "invalidPasswordError" }),
});

export type UpdateUsernameSchemaType = z.infer<typeof updateUsernameSchema>;
export type UpdateUsernameErrors =
  | "minUsernameError"
  | "maxUsernameError"
  | "invalidPasswordError";
