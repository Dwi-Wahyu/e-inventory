import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Tolong isi username")
    .email("Username tidak valid, contoh: admin@gmail.com"),
  password: z.string().min(1, "Tolong isi password"),
});
