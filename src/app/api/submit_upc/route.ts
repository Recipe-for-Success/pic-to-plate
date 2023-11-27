import { AttributeValue, UpdateItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { NextRequest } from "next/server";
import { updateItem } from "../utils";

type UPCUpdateData = {
    upc_id: number,
    updateExpression: string,
    expression: Record<string, AttributeValue>,
}

export const PUT = async(request: NextRequest) => {
    const requestBody = await request.text();
    const upcData: UPCUpdateData = JSON.parse(requestBody);

    let putResult: UpdateItemCommandOutput; 
    putResult = await updateItem("UPC", "UPC", "N", upcData.upc_id, upcData.updateExpression, upcData.expression);

    let response = new Response(JSON.stringify({data: putResult}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
}

