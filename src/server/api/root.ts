import { createTRPCRouter } from "~/server/api/trpc";
import { cardRouter } from "./routers/card";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  card: cardRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
