import { Request, Response, NextFunction } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";


class createProductController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { name, price, description, category_id } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: "Imagem do produto é obrigatória" });
        }

        const createProductService = new CreateProductService();

        const createProduct = await createProductService.execute({
            name: name,
            price: parseInt(price),
            description: description,
            category_id: category_id,
            imageBuffer: req.file.buffer,
            imageName: req.file.originalname
        });
        return res.json(createProduct);
    }
}
export { createProductController }