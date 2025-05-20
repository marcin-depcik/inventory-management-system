import { ICommandHandler } from '@src/common/interfaces/commands/command-handler.interface';
import { inject, injectable } from 'inversify';
import { CommandHandler } from '@src/infrastructure/decorators/commands/command-handler.decorator';
import { InternalError } from '@src/common/errors/internal-error';
import { StatusCodes } from 'http-status-codes';
import { CreateOrderCommand } from '../impl/create-order.command';
import { OrderRepository } from '@src/infrastructure/database/repositories/order.repository';
import { IOrderProduct } from '@src/infrastructure/database/models/order.model';
import { ProductRepository } from '@src/infrastructure/database/repositories/product.repository';
import { ProductQuantityService } from '../services/product-quantity.service';
import { IProductDocument } from '@src/infrastructure/database/models/product.model';

@injectable()
@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
    constructor(
        @inject(OrderRepository) private readonly orderRepository: OrderRepository,
        @inject(ProductRepository) private readonly productRepository: ProductRepository,
        @inject(ProductQuantityService)
        private readonly productQuantityService: ProductQuantityService,
    ) {}

    async execute(command: CreateOrderCommand) {
        const productsToUpdate = await this.validateStockBeforeOrder(command.products);
        await this.updateStockBeforeOrder(productsToUpdate);

        return this.orderRepository.create(command);
    }

    private validateStockBeforeOrder(orderProducts: IOrderProduct[]) {
        return Promise.all(
            orderProducts.map(async ({ productId, quantity }) => {
                const product = await this.productRepository.findOne(productId);
                if (!product) {
                    throw new InternalError(
                        StatusCodes.NOT_FOUND,
                        `Product with id "${productId}" was not found`,
                    );
                }

                return this.productQuantityService.decreaseProductStock(product, quantity);
            }),
        );
    }

    private updateStockBeforeOrder(products: IProductDocument[]) {
        return Promise.all(
            products.map((product) => {
                const id = product._id as string;
                return this.productRepository.update(id, product);
            }),
        );
    }
}
