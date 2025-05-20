export class InvalidHandlerException extends Error {
    constructor(param: 'query' | 'command') {
        super(`Invalid ${param} handler exception`);
    }
}
