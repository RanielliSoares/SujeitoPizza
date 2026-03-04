import prismaClient from "../../prisma";

interface EditCategoryProps {
    name: string;
}

class EditCategoryService {
    async execute({ name }: EditCategoryProps, id: string) {

        const categoryAlreadyExists = await prismaClient.category.findFirst({
            where: {
                id: id
            }
        });
        if (!categoryAlreadyExists) {
            throw new Error("Categoria não encontrada!");
        }

        try {
            const category = await prismaClient.category.update({
                where: {
                    id: id
                }, data: {
                    name: name,
                    updatedAt: new Date()
                }, select: {
                    id: true,
                    name: true,
                    updatedAt: true,
                }
            });
            return category;

        }
        catch (err) {
            throw new Error("Falha ao editar categoria");
        }
    }
}
export { EditCategoryService };