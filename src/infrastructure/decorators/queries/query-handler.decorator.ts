import 'reflect-metadata';
import { v4 } from 'uuid';
import { IQuery } from '@src/common/interfaces/queries/query.interface';
import { QUERY_HANDLER_METADATA, QUERY_METADATA } from '@src/common/constants/decorators';

export const QueryHandler = (query: IQuery): ClassDecorator => {
    return (handler: object) => {
        if (!Reflect.hasOwnMetadata(QUERY_METADATA, query)) {
            Reflect.defineMetadata(QUERY_METADATA, { id: v4() }, query);
        }
        Reflect.defineMetadata(QUERY_HANDLER_METADATA, query, handler);
    };
};
