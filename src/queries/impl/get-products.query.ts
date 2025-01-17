import { IQuery } from '@src/common/interfaces/queries/query.interface';
import { injectable } from 'inversify';

@injectable()
export class GetProductsQuery implements IQuery {
    constructor() {}
}
