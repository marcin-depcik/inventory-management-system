import { CreateOrderDto } from '@src/api/controllers/order/dto/create-order.dto';
import { ICommand } from '@src/common/interfaces/commands/command.interface';
import { injectable } from 'inversify';

@injectable()
export class CreateOrderCommand implements ICommand {
    readonly customerId: CreateOrderDto['customerId'];
    readonly products: CreateOrderDto['products'];

    constructor({ customerId, products }: CreateOrderDto) {
        this.customerId = customerId;
        this.products = products;
    }
}
