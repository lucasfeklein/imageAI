import Replicate from "replicate";
import { z } from "zod";
import { env } from "~/env.mjs";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import downloadAndUploadImage from "~/utils/uploadImage";

export const exampleRouter = createTRPCRouter({
  getImages: publicProcedure
    .input(z.object({ onlyUser: z.boolean() }))
    .query(({ ctx, input }) => {
      if (input.onlyUser) {
        return ctx.prisma.image.findMany({
          where: {
            userId: ctx.session?.user.id,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return ctx.prisma.image.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  postImage: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const replicate = new Replicate({
        auth: env.REPLICATE_API_TOKEN,
      });

      const imageLoading = await ctx.prisma.image.create({
        data: {
          userId: ctx.session.user.id,
        },
      });

      console.log("start generating image");

      const output = (await replicate.run(
        "lucasfeklein/uber-klein:a961f299c0f8d6895f43a7756fee27c89ce5e6baa4d0c7cbb5c7d3efd241b289",
        {
          input: {
            prompt: input.prompt,
            negative_prompt:
              "((blurry)), duplicate, deformed, cartoon, animated, render, missing limbs, child, childish",
            width: 512,
            height: 512,
          },
        }
      )) as any[];

      const imageUrl = output[0];

      console.log(imageUrl);

      const imageKey = await downloadAndUploadImage(imageUrl);

      return ctx.prisma.image.update({
        where: {
          id: imageLoading.id,
        },
        data: {
          imageUrl: `https://pub-29f672e007514c6d9cf62f0fb4d73986.r2.dev/${imageKey}`,
        },
      });
    }),
});
