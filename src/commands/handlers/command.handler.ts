import 'reflect-metadata';
import { injectable } from 'inversify';
import { container } from '@src/infrastructure/config/inversify.config';
import { ICommandHandler } from '@src/common/interfaces/commands/command-handler.interface';
import { ICommand } from '@src/common/interfaces/commands/command.interface';
import { COMMAND_HANDLER_METADATA, COMMAND_METADATA } from '@src/common/constants/decorators';
import { CommandMetadata } from '@src/common/interfaces/commands/command-metadata.handler';
import { HandlerNotFoundException } from '@src/common/errors/exceptions/handler-not-found-exception';
import { InvalidHandlerException } from '@src/common/errors/exceptions/invalid-handler-exception';
import { CreateProductHandler } from './create-product.handler';
import { RestockProductHandler } from './restock-product.handler';
import { SellProductHandler } from './sell-product.handler';
import { CreateOrderHandler } from './create-order.handler';

@injectable()
export class CommandHandler implements ICommandHandler {
    private registeredHandlers = new Map<string, ICommandHandler<ICommand>>();

    constructor() {
        this.register([
            CreateProductHandler,
            RestockProductHandler,
            SellProductHandler,
            CreateOrderHandler,
        ]);
    }

    public execute<T extends ICommand, R = any>(command: T): Promise<R> {
        const { constructor: commandType } = Object.getPrototypeOf(command);
        const commandMetadata: CommandMetadata = Reflect.getMetadata(COMMAND_METADATA, commandType);
        if (!commandMetadata) {
            throw new InvalidHandlerException('command');
        }

        const commandId = commandMetadata.id;
        const handler = this.registeredHandlers.get(commandId);
        if (!handler) {
            throw new HandlerNotFoundException('command');
        }

        return handler.execute(command);
    }

    private register(handlers: (new (...args: any[]) => ICommandHandler<ICommand>)[]) {
        handlers.forEach((handler) => {
            const handlerInstance = container.resolve(handler);
            if (!handlerInstance) {
                return;
            }

            const command: ICommand = Reflect.getMetadata(COMMAND_HANDLER_METADATA, handler);
            const commandMetadata: CommandMetadata = Reflect.getMetadata(COMMAND_METADATA, command);
            const commandId = commandMetadata.id;
            if (!commandId) {
                throw new InvalidHandlerException('command');
            }

            this.registeredHandlers.set(commandId, handlerInstance);
        });
    }
}
