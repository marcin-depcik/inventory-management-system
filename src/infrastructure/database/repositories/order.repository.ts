import { injectable } from 'inversify';
import { IOrder, OrderModel } from '../models/order.model';

@injectable()
export class OrderRepository {
    private readonly orderModel: typeof OrderModel;

    constructor() {
        this.orderModel = OrderModel;
    }

    create(order: IOrder) {
        const newOrder = new OrderModel(order);
        return this.orderModel.create(newOrder);
    }
}
