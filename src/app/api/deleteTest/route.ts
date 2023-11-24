import { deleteItem } from "../utils";
import { DeleteItemCommandOutput } from "@aws-sdk/client-dynamodb";

export const DELETE = async() => {
    let itemData: DeleteItemCommandOutput;
    itemData = await deleteItem("UPC", "UPC", "N", 123456789012);

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