const Airtable = require("airtable-node");
const dotenv = require("dotenv").config();

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base("appZWwsJDOvi8Pc8a")
  .table("maintable");

exports.handler = async (event, context, callback) => {
  const { id } = event.queryStringParameters;
  if (id) {
    try {
      const product = await airtable.retrieve(id);
      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with an id ${id}`,
        };
      } else {
        return {
          statusCode: 200,
          body: JSON.stringify(product),
        };
      }
    } catch (e) {
      return {
        statusCode: 500,
        body: "Something happened",
      };
    }
  } else {
    try {
      const { records } = await airtable.list();
      const products = records.map((product) => {
        const { id } = product;
        const { name, image, price } = product.fields;
        const url = image[0].url;
        return { id, name, url, price };
      });
      return {
        statusCode: 200,
        body: JSON.stringify(products),
      };
    } catch (e) {
      return {
        statusCode: 500,
        body: "General Server table",
      };
    }
  }
};
