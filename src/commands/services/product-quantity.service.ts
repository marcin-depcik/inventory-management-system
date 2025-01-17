import { IProductDocument } from '@src/infrastructure/database/models/product.model';
import { injectable } from 'inversify';
import { RestockProductCommand } from '../impl/restock-product.command';
import { InternalError } from '@src/common/errors/internal-error';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class ProductQuantityService {
    constructor() {}

    increaseProductStock(product: IProductDocument, quantity: RestockProductCommand['quantity']) {
        const initialStock = product.stock;
        product.stock = initialStock + quantity;
        if (product.stock > Number.MAX_SAFE_INTEGER) {
            throw new InternalError(
                StatusCodes.BAD_REQUEST,
                'Maximum product quantity limit has been exceeded',
            );
        }

        return product;
    }

    decreaseProductStock(product: IProductDocument, quantity: RestockProductCommand['quantity']) {
        const initialStock = product.stock;
        product.stock = initialStock - quantity;
        if (product.stock < 0) {
            throw new InternalError(
                StatusCodes.BAD_REQUEST,
                `Too little product in stock. Only ${initialStock} products left`,
            );
        }

        return product;
    }
}
