import prismaClient from "../../prisma";

interface ListProductCategoryProps {
    category_id: string;
}

class ListProductCategoryService {
    async execute({ category_id }: ListProductCategoryProps) {

        const products = await prismaClient.product.findMany({
            where: {
                category_id: category_id
            }, select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                category_id: true
            }
        })

        return products;
    }
}
export { ListProductCategoryService }