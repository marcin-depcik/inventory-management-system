import express from 'express';
import { container } from '@src/infrastructure/config/inversify.config';
import { OrderController } from '@src/api/controllers/order/order.controller';

const orderRouter = express.Router();
const orderController = container.resolve(OrderController);

orderRouter.post('/', orderController.createOrder.bind(orderController));

export { orderRouter };
