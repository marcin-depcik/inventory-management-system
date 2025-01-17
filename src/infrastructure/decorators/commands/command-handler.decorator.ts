import 'reflect-metadata';
import { v4 } from 'uuid';
import { ICommand } from '@src/common/interfaces/commands/command.interface';
import { COMMAND_HANDLER_METADATA, COMMAND_METADATA } from '@src/common/constants/decorators';

export const CommandHandler = (command: ICommand): ClassDecorator => {
    return (handler: object) => {
        if (!Reflect.hasOwnMetadata(COMMAND_METADATA, command)) {
            Reflect.defineMetadata(COMMAND_METADATA, { id: v4() }, command);
        }
        Reflect.defineMetadata(COMMAND_HANDLER_METADATA, command, handler);
    };
};
