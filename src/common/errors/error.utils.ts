type ErrorWithMessage = {
    message: string;
};

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
    return (
        error !== undefined &&
        error !== null &&
        typeof error === 'object' &&
        'message' in error &&
        typeof error.message === 'string'
    );
};

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
    if (isErrorWithMessage(maybeError)) return maybeError;

    try {
        return new Error(JSON.stringify(maybeError));
    } catch {
        return new Error(String(maybeError));
    }
};

export const getErrorMessage = (error: unknown) => {
    return toErrorWithMessage(error).message;
};
