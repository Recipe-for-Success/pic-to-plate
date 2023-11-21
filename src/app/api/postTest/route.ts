import { createItem } from "../utils";
import { PutItemCommandOutput } from "@aws-sdk/client-dynamodb";

export const POST = async() => {
    let itemData: PutItemCommandOutput;
    itemData = await createItem();

    // console.log("Retrieved DATA: ___ ", itemData);

    let response = new Response(JSON.stringify({data: itemData}), {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Custom-Header': 'Some value',
        // Add more headers as needed
      },
    });

    return response;
}