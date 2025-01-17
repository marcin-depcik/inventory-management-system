import { RestockProductDto } from '@src/api/controllers/product/dto/restock-product.dto';
import { ICommand } from '@src/common/interfaces/commands/command.interface';
import { injectable } from 'inversify';

@injectable()
export class RestockProductCommand implements ICommand {
    readonly id: string;
    readonly quantity: RestockProductDto['quantity'];

    constructor(id: string, { quantity }: RestockProductDto) {
        this.id = id;
        this.quantity = quantity;
    }
}
