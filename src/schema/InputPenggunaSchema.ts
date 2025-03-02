import { z } from "zod";

export const inputPenggunaSchema = z.object({
  nama: z.string().min(1, "Tolong isi nama"),
  username: z
    .string()
    .min(1, "Tolong isi username")
    .email("Username tidak valid, contoh: admin@gmail.com"),
  password: z.string().min(1, "Tolong isi password"),
});
