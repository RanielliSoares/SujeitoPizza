import { z } from "zod";

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(1, { message: "O nome precisa ter no mínimo 1 letra" }),
        price: z.string().min(1, { message: "O preço é obrigatório" }),
        description: z.string().min(1, { message: "A descrição precisa ter no mínimo 1 letra" }),
        category_id: z.string({ message: "O id da categoria precisa ser um texto" }),
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
})