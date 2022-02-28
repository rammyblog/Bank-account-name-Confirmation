import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv-safe';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { __prod__ } from './constants';
import { MyContext } from './types/context.types';
import { AccountResolver } from './resolvers/account.resolver';

dotenv.config();

createConnection()
  .then(async (_) => {
    const app = express();
    app.use(express.json());
    if (__prod__) {
      app.set('trust proxy', 1); // trust first proxy
    }
    app.get('/', (_, res) => {
      res.send('Hello World!');
    });

    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [AccountResolver],
        validate: false,
      }),
      context: ({ req, res }): MyContext => ({
        req,
        res,
      }),
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });
    await server.start();
    server.applyMiddleware({
      app,
      cors: false,
    });

    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));
