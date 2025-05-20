import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import mongodb from './infrastructure/database/mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorHandlerMiddleware } from './infrastructure/middleware/errors/error-handler.middleware';
import { router } from './api/routes/routes';
import { CYAN_MESSAGE } from './common/constants/console-colors';

const app = express();
const db = mongodb();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);
app.use(errorHandlerMiddleware);

const URI = process.env.MONGODB_URI || '';
db.connect(URI, () => {
    console.log(CYAN_MESSAGE, '[mongodb] connected to database');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(CYAN_MESSAGE, `[express] server running on http://localhost:${PORT}`);
});
