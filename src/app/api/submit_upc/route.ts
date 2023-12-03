import { AttributeValue, GetItemCommandOutput, UpdateItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { NextRequest } from "next/server";
import { readItem, updateItem } from "../utils";

type UPCUpdateData = {
    upc_id: number,
    ingredient: string
}

export const PUT = async(request: NextRequest) => {
    const requestBody = await request.text();
    const upcData: UPCUpdateData = JSON.parse(requestBody);
    let updateExpression: string = "set ingredient = :newIngredient, productName = :newIngredient";
    let expression: Record<string, AttributeValue> = { ":newIngredient": { S: upcData.ingredient }, };

    let getResult: GetItemCommandOutput;
    getResult = await readItem("Ingredient", "ID", "S", upcData.ingredient);

    if (getResult.Item) {
      let putResult: UpdateItemCommandOutput; 
      putResult = await updateItem("UPC", "UPC", "N", upcData.upc_id, updateExpression, expression);

      let response1 = new Response(JSON.stringify({data: putResult}), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response1;
    }

    let result: string = "Ingredient Not In Database!";

    let response = new Response(JSON.stringify({data: result}), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
}

