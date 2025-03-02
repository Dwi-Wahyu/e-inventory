import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  deletePenggunaData,
  editPenggunaData,
  getPenggunaData,
  postPenggunaData,
} from "../controllers/penggunaControllers";

export const penggunaRouter = createTRPCRouter({
  penggunaData: getPenggunaData,
  postPengguna: postPenggunaData,
  editPengguna: editPenggunaData,
  deletePengguna: deletePenggunaData,
});
