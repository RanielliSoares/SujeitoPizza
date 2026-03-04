import { Request, Response, NextFunction } from "express";
import { EditCategoryService } from "../../services/category/EditCategoryService";


class EditCategoryController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { name, id } = req.body;
        const editCategory = new EditCategoryService();
        const category = await editCategory.execute({ name: name }, id);

        return res.json(category);
    }
}

export { EditCategoryController };