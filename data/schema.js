import { buildSchema } from "graphql";

const schema = buildSchema(`

   type Product {
     id: ID
     name: String
     description: String
     price: Float
     soldout: Soldout
     stores: [Stores]
   }

   enum Soldout {
      SOLDOUT
      ONSALE
   }
   type Stores {
    store: String
   }

    type Query {
      getProduct(id: ID): Product
      getAllProducts: [Product]
    }

    input ProductInput {
     id: ID
     name: String
     description: String
     price: Float
     soldout: Soldout
     stores: [StoreInput]
    }

    input StoreInput {
        store: String
    }

    type Mutation {
        createProduct(input: ProductInput ): Product
        updateProduct(input: ProductInput ): Product
        deleteProduct(id: ID! ): String
    }
`);

export default schema;
