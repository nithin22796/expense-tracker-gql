import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

import mergedResolvers from "./resolver/index.js";
import mergedTypeDefs from "./typeDef/index.js";

import {connectDB} from './db/connectDB.js';

dotenv.config();
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start();
await connectDB();
 
app.use(
  cors(),
  express.json(),
  expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);