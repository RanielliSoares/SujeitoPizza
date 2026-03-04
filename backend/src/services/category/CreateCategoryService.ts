import prismaClient from "../../prisma";

interface CreateCategoryProps {
    name: string;
}

class CreateCategoryService {
    async execute({ name }: CreateCategoryProps) {

        const categoryAlreadyExists = await prismaClient.category.findFirst({
            where: {
                name: name
            }
        })
        if (categoryAlreadyExists) {
            throw new Error("Categoria já cadastrada!");

        }
        try {
            const category = await prismaClient.category.create({
                data: {
                    name: name
                }, select: {
                    id: true,
                    name: true,
                    createdAt: true,
                }
            });
            return category;
        } catch (err) {
            throw new Error("Falha ao criar categoria");
        }
    }
}
export { CreateCategoryService };