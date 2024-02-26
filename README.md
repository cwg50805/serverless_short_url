# Serverless shorten url

A serverless URL shortener built with `sst.dev`, ready to be hosted on AWS in just a few steps.

## Table of Contents

- [Prerequisite](#prerequisite)
- [Installation](#installation)
- [Usage](#usage)

## Prerequisite

Before you begin, make sure you have the AWS CLI configured on your local machine. You can follow the instructions [here](https://sst.dev/chapters/configure-the-aws-cli.html).



## Installation

### Backend
1. Clone the repository and navigate to the project directory.
2. Install dependencies with `pnpm install`.
3. Start the development server with `pnpm sst dev`.
4. Once the server is running, you will see the ApiEndpoint that you can interact.


### Frontend
1. Navigate to the `packages/frontend/` directory.
2. Start the frontend development server with `pnpm sst dev`.

## Usage

Creating a URL shortener is a common task, but deploying it on AWS can be challenging. To simplify this process, I decided to use `sst.dev` to manage the deployment and infrastructure configuration for the URL shortener.