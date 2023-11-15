import { DynamoDB } from "@aws-sdk/client-dynamodb";

const dbclient = new DynamoDB({region: 'ap-south-1' });

export default dbclient;