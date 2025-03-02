import { z } from "zod";

export const datatableQuery = z.object({
  search: z.string(),
  filter: z.string(),
});
