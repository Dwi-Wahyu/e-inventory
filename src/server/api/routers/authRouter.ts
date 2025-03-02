import { loginSchema } from "~/schema/LoginSchema";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const { username, password } = input;

    const searchUser = await ctx.db.pengguna.findFirst({
      where: {
        AND: {
          username,
          password,
        },
      },
    });

    if (!searchUser) {
      return {
        success: false,
        message: "Username atau password salah",
      };
    }

    return {
      success: true,
      message: "Berhasil login",
    };
  }),
});
