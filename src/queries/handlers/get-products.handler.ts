import { IQueryHandler } from '@src/common/interfaces/queries/query-handler.interface';
import { QueryHandler } from '@src/infrastructure/decorators/queries/query-handler.decorator';
import { GetProductsQuery } from '../impl/get-products.query';
import { inject, injectable } from 'inversify';
import { ProductRepository } from '@src/infrastructure/database/repositories/product.repository';

@injectable()
@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler {
    constructor(@inject(ProductRepository) private readonly productRepository: ProductRepository) {}

    execute(_query: GetProductsQuery) {
        return this.productRepository.find();
    }
}
