import prismaClient from "../../prisma";

class ListProductService {
    async execute() {
        const products = await prismaClient.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                disabled: true,
                createdAt: true,
                category: {
                    select: {
                        name: true,
                    }
                }
            }, orderBy: {
                createdAt: "desc"
            }
        })
        return products;
    }

}

export { ListProductService };