import express from "express";
import { graphqlHTTP } from "express-graphql";
import resolver from "./data/resolver";
import schema from "./data/schema";

const app = express();

app.get("/", (req, res) => {
  res.send("Graphql Tutorial");
});

const root = resolver;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.set("port", 8000);

app.listen(8000, () => console.log("Open localhost:8080/graphql"));
