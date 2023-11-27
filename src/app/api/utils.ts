import { PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand, AttributeValue, BatchGetItemCommand, BatchGetItemCommandOutput} from '@aws-sdk/client-dynamodb'; 
import dbclient from '@/lib/dynamodb';

const convertToAttributeValue = (value: string | number): AttributeValue => {
  return typeof value === "number" ? { N: value.toString() } : { S: value };
};

export const createItem = async () => {
    const command = new PutItemCommand({
        TableName: "EspressoDrinks",  
        Item: {
            DrinkName: { S: "Coffee" },
            Variants: { SS: ["Latte", "Mocha"]},
            isTasty: {BOOL: true},
        },
    });

    const response = dbclient.send(command);

    return response;
}


export const readItem = async (tableName: string, keyName: string, keyType: string, keyValue: number | string) => {
    const key: Record<string, AttributeValue> = {};
    key[keyName] = convertToAttributeValue(keyValue);
    
    const command = new GetItemCommand({
        TableName: tableName,
        Key: key,
    });

    const response = await dbclient.send(command);
    // console.log(response);
    return response;
}

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

    // const command = new BatchGetItemCommand({
    //     RequestItems: {
    //         [tableName]: {
    //             Keys: keysList,
    //         }
    //     }
    // })

    // const response = await dbclient.send(command);
    // console.log("REP: ", response);
    // console.log("REP2: ", response?.Responses?.[tableName]);
    return response;
}

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



const utils = {createItem, readItem, updateItem, deleteItem};

export default utils;
