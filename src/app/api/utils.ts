import { PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand, AttributeValue, BatchGetItemCommand, BatchGetItemCommandOutput} from '@aws-sdk/client-dynamodb'; 
import dbclient from '@/lib/dynamodb';

// Ensure right format
const convertToAttributeValue = (value: string | number): AttributeValue => {
  return typeof value === "number" ? { N: value.toString() } : { S: value };
};

// Read a single item from any table
export const readItem = async (tableName: string, keyName: string, keyType: string, keyValue: number | string) => {
    const key: Record<string, AttributeValue> = {};
    key[keyName] = convertToAttributeValue(keyValue);
    
    const command = new GetItemCommand({
        TableName: tableName,
        Key: key,
    });

    const response = await dbclient.send(command);

    return response;
}

// Read a batch of items from any table.
export const readBatch = async(tableName: string, keyName: string, keyType: string, keyValues: number[] | string[]) => {
    let keysList: Record<string, AttributeValue>[] = [];

    for (let val of keyValues) {
        let keys: Record<string, AttributeValue> = {};
        keys[keyName] = convertToAttributeValue(val);
        keysList.push(keys);
    }

    const numBatches: number = Math.ceil(keysList.length * 1.0 / 100.0);

    const command = new BatchGetItemCommand({
        RequestItems: {
            [tableName]: {
                Keys: keysList.slice(0, Math.min(100, keysList.length)),
            }
        }
    })

    const response = await dbclient.send(command);

    // Split up batches into mini-batches of 100 as required by Dynamo.
    for (let i = 1; i < numBatches; i++) {
        let start = 100 * i;
        let end = Math.min(100 * (i+1), keysList.length);
        
        const command = new BatchGetItemCommand({
            RequestItems: {
                [tableName]: {
                    Keys: keysList.slice(start, end),
                    ProjectionExpression: "ID",
                }
            }
        })

        const response2 = await dbclient.send(command);
        response?.Responses?.[tableName].push(...(response2?.Responses?.[tableName]?? []));  
    }

    return response;
}

// Update a single item in any table
export const updateItem = async (tableName: string, keyName: string, keyType: string, keyValue: number, updateExpression: string, expressionAttributeValues: Record<string, AttributeValue>) => {
    const key: Record<string, AttributeValue> = {};
    key[keyName] = convertToAttributeValue(keyValue);
    
    const command = new UpdateItemCommand({
        TableName: tableName,
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
    });

    const response = await dbclient.send(command);
    console.log(response);
    return response;    
}

// Delete a single item in any table
export const deleteItem = async (tableName: string, keyName: string, keyType: string, keyValue: any) => {
    const key: Record<string, AttributeValue> = {};
    key[keyName] = convertToAttributeValue(keyValue);
    
    const command = new DeleteItemCommand({
        TableName: tableName,
        Key: key,
    });

    const response = await dbclient.send(command);
    console.log(response);
    return response;
}

const utils = {readItem, updateItem, deleteItem};

export default utils;
