export class HandlerNotFoundException extends Error {
    constructor(param: 'query' | 'command') {
        super(`The ${param} handler was not found`);
    }
}
