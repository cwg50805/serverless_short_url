import { Table } from "sst/node/table";
import handler from "@serverless-short-url/core/handler";
import dynamoDb from "@serverless-short-url/core/dynamodb";
import generateShortUrl from "@serverless-short-url/core/hash";


export const main = handler(async (event) => {
    let data = {
        long_url: "",
      };
    
    if (event.body != null) {
        data = JSON.parse(event.body);
    }

    const shortUrl = generateShortUrl(data.long_url)
  
    const params = {
      TableName: Table.short_url.tableName,
      Item: {
        // The attributes of the item to be created
        shortId: shortUrl, // The hashId for this long url
        createdAt: Date.now(), // Current Unix timestamp
        originUrl: data.long_url,
        hits: 0,
      },
    };
  
    await dynamoDb.put(params);
  
    return {
      body: JSON.stringify(params.Item),
      statusCode: 200,
    };
  });