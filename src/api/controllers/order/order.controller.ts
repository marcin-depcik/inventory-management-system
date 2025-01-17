import { CommandHandler } from '@src/commands/handlers/command.handler';
import { GenericRequest } from '@src/common/interfaces/generic-request.interface';
import { ZodValidate } from '@src/common/validators/zod.validator';
import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { CreateOrderDto, createOrderSchema } from './dto/create-order.dto';
import { CreateOrderCommand } from '@src/commands/impl/create-order.command';

@injectable()
export class OrderController {
    constructor(@inject(CommandHandler) private readonly commandHandler: CommandHandler) {}

    @ZodValidate(createOrderSchema)
    async createOrder(req: GenericRequest<CreateOrderDto>, res: Response, next: NextFunction) {
        try {
            const createOrderDto = req.body;
            const result = await this.commandHandler.execute(
                new CreateOrderCommand(createOrderDto),
            );

            res.status(StatusCodes.CREATED).json(result);
        } catch (error) {
            next(error);
        }
    }
}
