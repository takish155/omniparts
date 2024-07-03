import isAdmin from "@/actions/admin/isAdmin";
import { TRPCError, inferRouterOutputs, initTRPC } from "@trpc/server";
import { AppRouter } from ".";
import { auth } from "@/app/api/auth/auth";

export const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
export type RouterOuput = inferRouterOutputs<AppRouter>;

export const authenticatedProcedure = t.procedure.use(async (opts) => {
  const session = await auth();
  if (!session) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Unauthorized" });
  }
  return opts.next({
    ctx: {
      user: session,
    },
  });
});

export const adminProcedure = t.procedure.use(async (opts) => {
  const admin = await isAdmin();
  if (!admin) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return opts.next({
    ctx: {
      user: admin,
    },
  });
});
