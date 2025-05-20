import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { InternalError } from '../errors/internal-error';
import { StatusCodes } from 'http-status-codes';

export function ZodValidate(schema: ZodSchema) {
    return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                req.body = schema.parse(req.body);
                await originalMethod.call(this, req, res, next);
            } catch (error) {
                if (error instanceof ZodError) {
                    const errors = error.errors.map((e) => e.message);
                    const customZodError = new InternalError(
                        StatusCodes.BAD_REQUEST,
                        JSON.stringify(errors),
                    );
                    next(customZodError);
                    return;
                }
                next(error);
            }
        };

        return descriptor;
    };
}
