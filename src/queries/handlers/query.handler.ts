import 'reflect-metadata';
import { injectable } from 'inversify';
import { container } from '@src/infrastructure/config/inversify.config';
import { IQueryHandler } from '@src/common/interfaces/queries/query-handler.interface';
import { IQuery } from '@src/common/interfaces/queries/query.interface';
import { QueryMetadata } from '@src/common/interfaces/queries/query-metadata.handler';
import { QUERY_HANDLER_METADATA, QUERY_METADATA } from '@src/common/constants/decorators';
import { InvalidHandlerException } from '@src/common/errors/exceptions/invalid-handler-exception';
import { HandlerNotFoundException } from '@src/common/errors/exceptions/handler-not-found-exception';
import { GetProductsHandler } from './get-products.handler';

@injectable()
export class QueryHandler implements IQueryHandler {
    private registeredHandlers = new Map<string, IQueryHandler<IQuery>>();

    constructor() {
        this.register([GetProductsHandler]);
    }

    execute<T extends IQuery, R = any>(query: T): Promise<R> {
        const { constructor: queryType } = Object.getPrototypeOf(query);
        const queryMetadata: QueryMetadata = Reflect.getMetadata(QUERY_METADATA, queryType);
        if (!queryMetadata) {
            throw new InvalidHandlerException('query');
        }

        const queryId = queryMetadata.id;
        const handler = this.registeredHandlers.get(queryId);
        if (!handler) {
            throw new HandlerNotFoundException('query');
        }

        return handler.execute(query);
    }

    register(handlers: (new (...args: any[]) => IQueryHandler<IQuery>)[]) {
        handlers.forEach((handler) => {
            const handlerInstance = container.resolve(handler);
            if (!handlerInstance) {
                return;
            }

            const query: IQuery = Reflect.getMetadata(QUERY_HANDLER_METADATA, handler);
            const queryMetadata: QueryMetadata = Reflect.getMetadata(QUERY_METADATA, query);
            const queryId = queryMetadata.id;
            if (!queryId) {
                throw new InvalidHandlerException('query');
            }

            this.registeredHandlers.set(queryId, handlerInstance);
        });
    }
}
