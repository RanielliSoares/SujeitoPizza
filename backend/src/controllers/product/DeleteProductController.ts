import { Request, Response, NextFunction } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.body;

        const deleteProductService = new DeleteProductService();

        const deleteProduct = await deleteProductService.execute({
            id: id
        });
        return res.json(deleteProduct);
    }
}
export { DeleteProductController }