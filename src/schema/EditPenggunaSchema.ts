import { z } from "zod";

export const editPenggunaSchema = z.object({
  id: z.string(),
  nama: z.string().min(1, "Tolong isi nama"),
  username: z
    .string()
    .min(1, "Tolong isi username")
    .email("Username tidak valid, contoh: admin@gmail.com"),
});
