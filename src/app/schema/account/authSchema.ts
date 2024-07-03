import z from "zod";

export const signInSchema = z.object({
  username: z
    .string()
    .min(3, { message: "invalidUsernameError" })
    .max(10, { message: "invalidUsernameError" }),
  password: z
    .string()
    .min(6, { message: "invalidPasswordError" })
    .max(20, { message: "invalidPasswordError" }),
});

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "minUsernameError" })
      .max(10, { message: "maxUsernameError" }),
    email: z
      .string()
      .email({ message: "invalidEmailError" })
      .max(50, { message: "invalidEmailError" }),
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

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type SignInErrors = "invalidUsernameError" | "invalidPasswordError";
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type SignUpErrors =
  | "minUsernameError"
  | "maxUsernameError"
  | "invalidEmailError"
  | "minPasswordError"
  | "maxPasswordError"
  | "passwordMismatchError";
