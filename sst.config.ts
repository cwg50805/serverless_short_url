import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";
import { StorageStack } from "./stacks/StorageStack";

export default {
  config(_input) {
    return {
      name: "serverless-short-url",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(API).stack(StorageStack);
  }
} satisfies SSTConfig;
