import { RED_MESSAGE } from '@src/common/constants/console-colors';
import { getErrorMessage } from '@src/common/errors/error.utils';
import { InternalError } from '@src/common/errors/internal-error';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function errorHandlerMiddleware(
    err: InternalError,
    req: Request,
    res: Response,
    _next: NextFunction,
) {
    const devMode = process.env.NODE_ENV === 'development';
    const displayedError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: getErrorMessage(err),
        ...(devMode && { stack: err.stack }),
    };
    if (!req.body.streaming || req.body.streaming === 'false') {
        res.setHeader('Content-Type', 'application/json');
        res.status(displayedError.statusCode).json(displayedError);

        console.error(RED_MESSAGE, `[error-handler] ${err.stack}`);
    }
}
