import express from 'express';
import 'express-async-errors';
import { errorHandler } from '@tanweerhossain/common';

import { attachMiddlewares } from "./middlewares/index";
import { attachRoutes } from "./middlewares/routes";

const app = express();

attachMiddlewares(app);

attachRoutes(app);

app.use(errorHandler);

export { app };