import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path"; 
import { graphqlHTTP } from "express-graphql";
import Userschema from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";
import authRoutes from "./routes/auth.js"; 

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public")); 

app.use(authRoutes);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: Userschema,
    rootValue: resolvers,
    graphiql: true,
    formatError(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || "An error occurred.";
      const code = err.originalError.code || 500;
      return { message: message, status: code, data: data };
    },
  })
);

mongoose
  .connect("DATABASE_URL", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
