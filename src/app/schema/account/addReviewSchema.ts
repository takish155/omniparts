import { z } from "zod";

export const addReviewSchema = z.object({
  reviewBody: z.string().min(10, { message: "minReviewBodyError" }).max(2000, {
    message: "maxReviewBodyError",
  }),
  starRating: z
    .number()
    .int()
    .min(0.5, { message: "minStarRatingError" })
    .max(5, { message: "maxStarRatingError" }),
});

export type AddReviewSchema = z.input<typeof addReviewSchema>;
