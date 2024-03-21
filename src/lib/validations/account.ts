import { users } from "$lib/server/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const createAccountSchema = createInsertSchema(users, {
  nickname: (schema) =>
    schema.nickname
      .min(3, {
        message: "Nickname must be at least 3 characters long",
      })
      .max(50, {
        message: "Nickname must be at most 50 characters long",
      }),
  email: (schema) =>
    schema.email.email({
      message: "Invalid email address",
    }),
  password: (schema) =>
    schema.password.min(8, {
      message: "Password must be at least 8 characters long",
    }),
}).pick({
  nickname: true,
  email: true,
  password: true,
});

export const loginIntoAccountSchema = createSelectSchema(users, {
  email: (schema) =>
    schema.email.email({
      message: "Invalid email address",
    }),
  password: (schema) =>
    schema.password.min(1, {
      message: "Required",
    }),
}).pick({
  email: true,
  password: true,
});
