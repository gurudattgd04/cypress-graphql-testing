/// <reference types="cypress" />
import { v4 as uuidv4 } from "uuid";

it("Validate graphql getAllProducts query", () => {
  const header = {
    "content-type": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
  };
  const queryBody = {
    query: `query{ getAllProducts{ name description price }}`,
  };
  const expectedResult = [
    {
      name: "Widget1",
      description: "new widget 1",
      price: 33.22,
    },
    {
      name: "Widget3",
      description: "new widget 3",
      price: 332.22,
    },
    {
      name: "GDProduct123",
      description: "GD Product",
      price: 20.12,
    },
  ];
  cy.request({
    method: "POST",
    headers: header,
    url: "http://localhost:8000/graphql",
    body: JSON.parse(JSON.stringify(queryBody)),
    retryOnStatusCodeFailure: true,
    retryOnNetworkFailure: true,
    timeout: 20000,
  }).then((res) => {
    expect(res.body.data.getAllProducts).to.have.length.above(1);
  });
});

it("Validate new product creation using mutation", () => {
  const header = {
    "content-type": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
  };
  const productName = `GDProduct${uuidv4()}`;
  const queryBody = `mutation {
        createProduct(
        input: {
        name: "${productName}",
        description: "GD Product",
        price: 20.12,
        soldout: SOLDOUT,
        stores: {
          store: "mysore"
        } }
        ){
          id
          name
        }
      }`;
  cy.request({
    method: "POST",
    headers: header,
    url: "http://localhost:8000/graphql",
    body: { query: JSON.parse(JSON.stringify(queryBody)) },
    timeout: 20000,
  }).then((res) => {
    expect(res.body.data.createProduct.name).to.eq(productName);
  });
});
