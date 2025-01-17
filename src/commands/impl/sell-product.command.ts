import { SellProductDto } from '@src/api/controllers/product/dto/sell-product.dto';
import { ICommand } from '@src/common/interfaces/commands/command.interface';
import { injectable } from 'inversify';

@injectable()
export class SellProductCommand implements ICommand {
    readonly id: string;
    readonly quantity: SellProductDto['quantity'];

    constructor(id: string, { quantity }: SellProductDto) {
        this.id = id;
        this.quantity = quantity;
    }
}
