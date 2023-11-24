import { updateItem } from "../utils";
import { UpdateItemCommandOutput } from "@aws-sdk/client-dynamodb";

export const PUT = async() => {
    let itemData: UpdateItemCommandOutput;
    itemData = await updateItem();

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