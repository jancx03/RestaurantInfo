import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import routes from './routes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);

app.use('/', routes);

/* APP wide error handler */
// vue, express ql
app.use(errorHandler);

export default app;
