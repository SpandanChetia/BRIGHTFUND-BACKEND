import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { application } from "express";
import { graphqlHTTP } from "express-graphql";
import graphqlSchema from "./graphql/schema";
import graphqlResolver from "./graphql/resolvers";

const app = express();

app.set("view engine", "pug");
app.set("view", "views");


app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    formatError(err){
      if(!err.originalError){
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || 'An error occured.';
      const code = err.originalError.code || 500;
      return { message: message, status: code, data : data};
    }
  })
);

mongoose.connect('DATABASE_URL')
  .then(result=>{
    app.listen(3000);
  })
  .catch(err=>{
    console.log('Error')
  });

