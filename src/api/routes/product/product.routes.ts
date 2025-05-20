import express from 'express';
import { container } from '@src/infrastructure/config/inversify.config';
import { ProductController } from '@src/api/controllers/product/product.controller';

const productRouter = express.Router();
const productController = container.resolve(ProductController);

productRouter.post('/', productController.createProduct.bind(productController));
productRouter.post('/:id/restock', productController.restockProduct.bind(productController));
productRouter.post('/:id/sell', productController.sellProduct.bind(productController));

productRouter.get('/', productController.getProducts.bind(productController));

export { productRouter };
