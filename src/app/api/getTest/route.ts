import { readItem } from "../utils";
import { GetItemCommandOutput } from "@aws-sdk/client-dynamodb";

export const GET = async() => {
    let itemData: GetItemCommandOutput;
    itemData = await readItem("EspressoDrinks", "DrinkName", "S", "Coffee");

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
