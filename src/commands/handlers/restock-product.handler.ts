import { ICommandHandler } from '@src/common/interfaces/commands/command-handler.interface';
import { CommandHandler } from '@src/infrastructure/decorators/commands/command-handler.decorator';
import { RestockProductCommand } from '../impl/restock-product.command';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { InternalError } from '@src/common/errors/internal-error';
import { ProductRepository } from '@src/infrastructure/database/repositories/product.repository';
import { ProductQuantityService } from '../services/product-quantity.service';

@injectable()
@CommandHandler(RestockProductCommand)
export class RestockProductHandler implements ICommandHandler {
    constructor(
        @inject(ProductRepository) private readonly productRepository: ProductRepository,
        @inject(ProductQuantityService)
        private readonly productQuantityService: ProductQuantityService,
    ) {}

    async execute({ id, quantity }: RestockProductCommand) {
        const product = await this.productRepository.findOne(id);
        if (!product) {
            throw new InternalError(StatusCodes.NOT_FOUND, `Product with id "${id}" was not found`);
        }

        const productToUpdate = this.productQuantityService.increaseProductStock(product, quantity);

        return this.productRepository.update(id, productToUpdate);
    }
}
