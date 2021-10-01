import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';

import cors from 'cors';
import express from 'express';
import jsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

import 'express-async-errors';

import { definitions, options } from '@docs/swaggerConfigurations';
import { handler } from '@shared/errors/Handler';

import { connect } from '../typeorm';
import { routes } from './routes';

connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/docs', serve, setup(jsdoc(definitions), options));
app.use(routes);
app.use(handler);

export { app };
