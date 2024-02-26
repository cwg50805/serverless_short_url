import { StackContext, Table } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {
  // Create the DynamoDB table
  const table = new Table(stack, "short-url", {
    fields: {
      shortId: "string",
    },
    primaryIndex: { partitionKey: "shortId"},
  });

  return {
    table,
  };
}