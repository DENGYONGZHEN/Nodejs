const fs = require("fs");
const server = require("fastify")();
const graphql = require("fastify-gql");

const schema = fs
  .readFileSync(__dirname + "/../shared/graphql-schema.gql")
  .toString();

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 4000;

const resolvers = {
  Query: {
    pid: () => process.pid,
    recipe: async (_obj, { id }) => {
      if (id != 42) throw new Error(`recipe ${id} not found`);
      return {
        id,
        name: "Chicken Tikka Masala",
        steps: "throw it in apot...",
      };
    },
  },
  Recipe: {
    ingredients: async (obj) => {
      return obj.id != 42
        ? []
        : [
            { id: 1, name: "Chicken", quantity: "1 lb" },
            { id: 2, name: "Sauce", quantity: "2 cups" },
          ];
    },
  },
};

server.register(graphql, { schema, resolvers, graphiql: true }).ready((err) => {
  if (err) throw err;
  server.listen(PORT, HOST, (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    console.log(`Producer running at ${address}/graphql`);
  });
});
