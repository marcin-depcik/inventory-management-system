import { RED_MESSAGE } from '@src/common/constants/console-colors';
import mongoose from 'mongoose';

function mongodb() {
    return {
        connect: (uri: string, callback?: () => void) => {
            mongoose
                .connect(uri, { dbName: process.env.MONGODB_BD_NAME })
                .then(() => {
                    if (callback) {
                        callback();
                    }
                })
                .catch((error) => {
                    console.error(RED_MESSAGE, `[mongodb] unable to connect to database`);
                    console.error(RED_MESSAGE, `[mongodb] ${error}`);
                });
        },
    };
}

export default mongodb;
