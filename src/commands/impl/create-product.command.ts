import { CreateProductDto } from '@src/api/controllers/product/dto/create-product.dto';
import { ICommand } from '@src/common/interfaces/commands/command.interface';
import { injectable } from 'inversify';

@injectable()
export class CreateProductCommand implements ICommand {
    readonly name: CreateProductDto['name'];
    readonly description: CreateProductDto['description'];
    readonly price: CreateProductDto['price'];
    readonly stock: CreateProductDto['stock'];

    constructor({ name, description, price, stock }: CreateProductDto) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }
}
