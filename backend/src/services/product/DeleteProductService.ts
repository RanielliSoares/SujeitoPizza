import prismaClient from "../../prisma";

interface DeleteProductProps {
    id: string;
}

class DeleteProductService {
    async execute({ id }: DeleteProductProps) {

        const productExists = await prismaClient.product.findFirst({
            where: {
                id: id
            }
        });
        if (!productExists) {
            throw new Error("Produto não encontrado");
        }

        const productUpdate = await prismaClient.product.update({
            where: {
                id: id
            },
            data: {
                disabled: true
            }
        })
        return { message: "Produto desativado com sucesso" };
    }
}

export { DeleteProductService }