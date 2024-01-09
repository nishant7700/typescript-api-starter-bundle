import express from 'express';
import 'express-async-errors';
import path from 'path';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from './config';
import cors from 'cors';
// import { UserRouter } from './api/users/UserRoutes';
import { Routes } from './domain/enums/RoutesEnum';
import morgan from 'morgan';
import { uploadRouter } from './services/uploads';
import { BranchRoutes } from './api/branches/BranchRoutes';

const app = express();
app.set('trust proxy', true);
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(currentUser);
app.use(Routes.BRANCH_ROUTE, BranchRoutes);

app.use(Routes.UPLOAD, uploadRouter);

const _dirname = path.resolve();
app.use('/uploads', express.static(path.join(_dirname, '/uploads')));

app.all('*', async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);
export { app };
