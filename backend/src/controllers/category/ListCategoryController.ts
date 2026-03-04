import { Request, Response, NextFunction } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const listCategory = new ListCategoryService();
        const categories = await listCategory.execute();

        return res.json(categories);
    }
}
export { ListCategoryController };
