import prismaClient from "../../prisma";
import { cloudinary } from "../../config/cloudinary";
import { Readable } from "node:stream";
import { ca } from "zod/v4/locales";

interface CreateProductProps {
    name: string;
    price: number;
    description: string;
    category_id: string;
    imageBuffer: Buffer;
    imageName: string;
}

class CreateProductService {
    async execute({ name, price, description, category_id, imageBuffer, imageName }: CreateProductProps) {

        const categoryExists = await prismaClient.category.findFirst({
            where: {
                id: category_id
            }
        });
        if (!categoryExists) {
            throw new Error("Categoria não encontrada");
        }
        //Antes de salvar no banco vamos salvar a imagem do produto dentro do cloudinary e pegar a URL
        let bannerUrl = "";
        try {
            const result = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "sujeito-pizza-products",
                        resource_type: "image",
                        public_id: `${Date.now()}-${imageName.split(".")[0]}`,
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                const bufferStream = Readable.from(imageBuffer);
                bufferStream.pipe(uploadStream);


            });
            bannerUrl = result.secure_url;


        } catch (error) {
            throw new Error("Erro ao fazer upload da imagem");
        }


        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: price,
                description: description,
                banner: bannerUrl,
                category_id: category_id
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        return product;
    }
}

export { CreateProductService }