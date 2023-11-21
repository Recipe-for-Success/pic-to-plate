import { PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand} from '@aws-sdk/client-dynamodb'; 
import dbclient from '@/lib/dynamodb';

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

export const readItem = async () => {
    const command = new GetItemCommand({
        TableName: "EspressoDrinks",
 
        Key: {
            DrinkName: { S: "Coffee" },
        },
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

export const deleteItem = async () => {
    const command = new DeleteItemCommand({
        TableName: "EspressoDrinks",
        Key: {
            DrinkName: { S: "Coffee" },
        }
    });

    const response = await dbclient.send(command);
    console.log(response);
    return response;
}

const utils = {createItem, readItem, updateItem, deleteItem};

export default utils;
