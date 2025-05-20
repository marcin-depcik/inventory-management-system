import { Request } from 'express';

export interface GenericRequest<T = any> extends Request {
    body: T;
}
