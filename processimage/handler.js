"use strict";

const AWS = require("aws-sdk");
const uuid = require("uuid");
const ENDPOINT_URL = "http://localstack:4566";
AWS.config.update({
  region: "us-east-2",
  endpoint: ENDPOINT_URL,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.postprocess = (event, context, callback) => {
  event.Records.forEach((record) => {
    // console.log("invoked!" + ENDPOINT_URL);
    const filename = record.s3.object.key;
    const filesize = record.s3.object.size;
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: uuid.v1(),
        filename: filename,
        filesize: filesize,
      },
    };
    // write the todo to the database
    dynamoDb.put(params, (error) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, null);
        return;
      }
      callback(null, null);
    });
  });
};
