import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { application } from "express";
import csrf from "csurf";
import { graphqlHTTP } from "express-graphql";
import graphqlSchema from "./graphql/schema";
import graphqlResolver from "./graphql/resolvers";

const app = express();

const csrfProtection = csrf();
app.set("view engine", "pug");
app.set("view", "views");

app.use(csrfProtection);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver
  })
);

