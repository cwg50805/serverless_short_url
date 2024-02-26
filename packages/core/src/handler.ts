import { Context, APIGatewayProxyEvent } from "aws-lambda";

interface LambdaResponse {
  body: string;
  statusCode: number;
  headers?: { [key: string]: string };
}

export default function handler(
  lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<LambdaResponse>
) {
  return async function (event: APIGatewayProxyEvent, context: Context) {
    let body, statusCode, headers;

    try {
      // Run the Lambda
      const result = await lambda(event, context);
      body = result.body;
      statusCode = result.statusCode;
      headers = result.headers || {};
    } catch (error) {
      statusCode = 500;
      body = JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      });
    }

    // Return HTTP response
    return {
      body,
      statusCode,
      headers,
    };
  };
}
