import { Request, Response, NextFunction } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController {
    async handle(req: Request, res: Response, next: NextFunction) {

        const listProduct = new ListProductService();
        const products = await listProduct.execute();
        return res.json(products);
    }
}
export { ListProductController };