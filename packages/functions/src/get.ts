import { Table } from "sst/node/table";
import handler from "@serverless-short-url/core/handler";
import dynamoDb from "@serverless-short-url/core/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: Table.short_url.tableName,
    // 'Key' defines the partition key and sort key of
    // the item to be retrieved
    Key: {
      shortId: event?.pathParameters?.shortId, // The id of the note from the path
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item

  console.log(result)

  return {
    body: JSON.stringify(result.Item),
    statusCode: 301,
    headers: {
        Location: result.Item.originUrl,
      },    
  };
});