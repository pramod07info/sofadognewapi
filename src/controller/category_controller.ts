import express from 'express'

import { ICategory } from '../model/index'
import { CategoryRepository } from '../repositories/index'

class CategoryController {
    private categoryRepository = new CategoryRepository()
    public path = '/feed/data/categories';
    public router = express.Router();
    public app = express();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, this.createCategory);
        this.router.get(this.path, this.getCategory); 
    }

    createCategory = async (request: express.Request, response: express.Response) => {
        const result = await this.categoryRepository.post(request)
        var category: ICategory = {
            id: result.id,
            colour: result.color,
            title: result.title
        }
        response.send(category)
    }

    getCategory = async (request: express.Request, response: express.Response) => {
        const result = await this.categoryRepository.get(request)
        let categories: ICategory[] = [];
        result.forEach(function(data){
            var category: ICategory = {
                id: data.ordinal,
                colour: data.color,
                title: data.title
            }
            categories.push(category);
        });
        response.send(categories)
    }
}

export default CategoryController;