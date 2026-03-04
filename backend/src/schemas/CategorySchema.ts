
import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ message: "O nome precisa ser um texto" })
      .min(2, { message: "O nome precisa ter no mínimo 2 letras" }),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2, { message: "O nome precisa ter no mínimo 2 letras" }),
    id: z.string({ message: "O id precisa ser um texto" }),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

