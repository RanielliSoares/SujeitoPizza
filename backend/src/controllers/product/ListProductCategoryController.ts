import { Request, Response, NextFunction } from "express";
import { ListProductCategoryService } from "../../services/product/ListProductCategoryService";

class ListProductCategoryController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { category_id } = req.body;

        const listProductCategoryService = new ListProductCategoryService();
        const products = await listProductCategoryService.execute({ category_id });

        return res.json(products);
    }
}
export { ListProductCategoryController }
