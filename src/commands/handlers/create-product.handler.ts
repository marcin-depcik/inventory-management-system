import { ICommandHandler } from '@src/common/interfaces/commands/command-handler.interface';
import { CreateProductCommand } from '../impl/create-product.command';
import { inject, injectable } from 'inversify';
import { CommandHandler } from '@src/infrastructure/decorators/commands/command-handler.decorator';
import { ProductRepository } from '@src/infrastructure/database/repositories/product.repository';

@injectable()
@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
    constructor(@inject(ProductRepository) private readonly productRepository: ProductRepository) {}

    execute(command: CreateProductCommand) {
        return this.productRepository.create(command);
    }
}
