import { CommandHandler } from '@src/commands/handlers/command.handler';
import { ZodValidate } from '@src/common/validators/zod.validator';
import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { CreateProductDto, createProductSchema } from './dto/create-product.dto';
import { GenericRequest } from '@src/common/interfaces/generic-request.interface';
import { CreateProductCommand } from '@src/commands/impl/create-product.command';
import { StatusCodes } from 'http-status-codes';
import { GetProductsQuery } from '@src/queries/impl/get-products.query';
import { QueryHandler } from '@src/queries/handlers/query.handler';
import { InternalError } from '@src/common/errors/internal-error';
import { RestockProductDto, restockProductSchema } from './dto/restock-product.dto';
import { RestockProductCommand } from '@src/commands/impl/restock-product.command';
import { SellProductDto, sellProductSchema } from './dto/sell-product.dto';
import { SellProductCommand } from '@src/commands/impl/sell-product.command';

@injectable()
export class ProductController {
    constructor(
        @inject(CommandHandler) private readonly commandHandler: CommandHandler,
        @inject(QueryHandler) private readonly queryHandler: QueryHandler,
    ) {}

    @ZodValidate(createProductSchema)
    async createProduct(req: GenericRequest<CreateProductDto>, res: Response, next: NextFunction) {
        try {
            const createProductDto = req.body;
            const result = await this.commandHandler.execute(
                new CreateProductCommand(createProductDto),
            );

            res.status(StatusCodes.CREATED).json(result);
        } catch (error) {
            next(error);
        }
    }

    @ZodValidate(restockProductSchema)
    async restockProduct(
        req: GenericRequest<RestockProductDto>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            if (!req.params || !req.params.id) {
                throw new InternalError(StatusCodes.BAD_REQUEST, 'Product id was not provided');
            }

            const productId = req.params.id;
            const restockProductDto = req.body;
            const result = await this.commandHandler.execute(
                new RestockProductCommand(productId, restockProductDto),
            );

            res.status(StatusCodes.OK).json(result);
        } catch (error) {
            next(error);
        }
    }

    @ZodValidate(sellProductSchema)
    async sellProduct(req: GenericRequest<SellProductDto>, res: Response, next: NextFunction) {
        try {
            if (!req.params || !req.params.id) {
                throw new InternalError(StatusCodes.BAD_REQUEST, 'Product id was not provided');
            }

            const productId = req.params.id;
            const sellProductDto = req.body;
            const result = await this.commandHandler.execute(
                new SellProductCommand(productId, sellProductDto),
            );

            res.status(StatusCodes.OK).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getProducts(_req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.queryHandler.execute(new GetProductsQuery());

            res.status(StatusCodes.OK).json(result);
        } catch (error) {
            next(error);
        }
    }
}
