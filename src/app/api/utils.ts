import { PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand, AttributeValue} from '@aws-sdk/client-dynamodb'; 
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


export const readItem = async (tableName: string, keyName: string, keyType: string, keyValue: any) => {
    const key: Record<string, AttributeValue> = {};
    key[keyName] = convertToAttributeValue(keyValue);
    
    const command = new GetItemCommand({
        TableName: tableName,
        Key: key,
    });

    const response = await dbclient.send(command);
    console.log(response);
    return response;
}

export const updateItem = async () => {
    const command = new UpdateItemCommand({
        TableName: "EspressoDrinks",
        Key: {
            DrinkName: { S: "Coffee" },
        },
        UpdateExpression: "set isTasty = :newName",
        ExpressionAttributeValues: {
            ":newName": { BOOL: false },
        },
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
