import z from "zod";

export const CategoryResponseSchema = z.object({
    categoryId: z.string(),
    name: z.string(),
    description: z.string().optional(),
    imageUrl: z.string(),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
    categoryCode: z.string(),
    active: z.boolean(),
})

export type CategoryResponse = z.infer<typeof CategoryResponseSchema>;