import express from 'express';
import { productRouter } from './product/product.routes';
import { orderRouter } from './order/order.routes';

const router = express.Router();

router.use('/products', productRouter);
router.use('/orders', orderRouter);

export { router };
