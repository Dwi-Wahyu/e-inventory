import { db } from "~/server/db";
import { publicProcedure } from "../trpc";
import { datatableQuery } from "~/schema/DatatableQuery";
import { log } from "console";
import { Prisma } from "@prisma/client";
import { inputPenggunaSchema } from "~/schema/InputPenggunaSchema";
import { editPenggunaSchema } from "~/schema/EditPenggunaSchema";
import { z } from "zod";

export const postPenggunaData = publicProcedure
  .input(inputPenggunaSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const createPengguna = await ctx.db.pengguna.create({
        data: input,
      });

      log(createPengguna);

      return {
        success: true,
        message: "Berhasil membuat pengguna",
      };
    } catch (error) {
      log(error);

      return {
        success: false,
        message: error as string,
      };
    }
  });

export const editPenggunaData = publicProcedure
  .input(editPenggunaSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const editPengguna = await ctx.db.pengguna.update({
        where: {
          id: input.id,
        },
        data: {
          nama: input.nama,
          username: input.username,
        },
      });

      log(editPengguna);

      return {
        success: true,
        message: "Berhasil update pengguna",
      };
    } catch (error) {
      log(error);

      return {
        success: false,
        message: error as string,
      };
    }
  });

export const getPenggunaData = publicProcedure
  .input(datatableQuery)
  .query(async ({ input, ctx }) => {
    let whereClause: Prisma.penggunaWhereInput;

    if (input.filter == "nama") {
      whereClause = {
        nama: {
          contains: input.search,
        },
      };
    } else {
      whereClause = {
        username: {
          contains: input.search,
        },
      };
    }

    log(input.search);

    const dataPengguna = await ctx.db.pengguna.findMany({
      where: whereClause,
      select: {
        id: true,
        nama: true,
        username: true,
      },
    });

    log(input.search);

    return dataPengguna;
  });

export const deletePenggunaData = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    try {
      const deletePengguna = await ctx.db.pengguna.delete({
        where: {
          id: input.id,
        },
      });

      log(deletePengguna);

      return {
        success: true,
        message: "Berhasil menghapus pengguna",
      };
    } catch (error) {
      log(error);

      return {
        success: false,
        message: error as string,
      };
    }
  });
