import * as CryptoJS from 'crypto-js';
import { useJsonBody } from "sst/node/api";
import { Table } from "sst/node/table";
import handler from "@serverless-short-url/core/handler";
import dynamoDb from "@serverless-short-url/core/dynamodb";

function generateShortUrl(originalUrl: string): string {
    // Add salt (e.g., current timestamp) to the original URL
    const salt = new Date().getTime().toString();
    const urlWithSalt = originalUrl + salt;

    // Hash the URL with salt using SHA-256
    const hash = CryptoJS.SHA256(urlWithSalt).toString(CryptoJS.enc.Hex);

    // Generate a short URL using the first 6 characters of the hash
    const shortUrl = hash.substring(0, 16);

    return shortUrl;
}


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