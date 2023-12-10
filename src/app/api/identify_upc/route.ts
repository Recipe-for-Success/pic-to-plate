import { NextRequest } from "next/server";
import { readItem } from "../utils";
import { GetItemCommandOutput } from "@aws-sdk/client-dynamodb";

// Identify UPC from DB or lookup and return ingredient name
export const GET = async(request: NextRequest) => {
    let upc_string: string | null = new URLSearchParams(request.url.split('?')[1]).get('upc_id');
    let upc_ID: number;

    // Converting string to number
    if (upc_string) {
      upc_ID = +upc_string;
    } else {
      throw new Error("Request missing or invalid");
    }
    
    let itemData: GetItemCommandOutput;
    itemData = await readItem("UPC", "UPC", "N", upc_ID);
    
    if (!itemData.Item) {
      // If the item is not in our DynamoDB database, we GET data from edamam API 
      const edamamData = await fetch(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=c4ab3076&app_key=6ce80f5d6445179e347747d07df4306d&upc=` + upc_ID + `&nutrition-type=cooking`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      try {
        const responseBody = await edamamData.text();
        const data = JSON.parse(responseBody);

        if (!data.hints) {
          // If the edamam database doesn't contain the provided item
          let errorString: string = "No item with that UPC found!";

          let response1 = new Response(JSON.stringify({data: errorString}), {
            status: 404,
            headers: {
            'Content-Type': 'application/json',
            },
          });

          return response1;
        } else {
          // If the item is in edamam, we normalize the name with NLP on our model server
          let longIngredient: string = data.hints[0].food.knownAs.split(',')[0];

          const shortIngredientData = await fetch(
            `http://localhost:8000/normalize_ingredient?raw_product=` + longIngredient,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const shortIngredient = await shortIngredientData.text();
          let shortName = JSON.parse(shortIngredient);

          if (!shortName.ingredient) {
            let errorString: string = "No matching ingredient in database!";

            let response2 = new Response(JSON.stringify({data: errorString}), {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
              },
            });

            return response2;
          }
          
          // Return the normalized name
          let response3 = new Response(JSON.stringify({data: shortName}), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          });

          return response3;
        }

      } catch (error: any) {
        console.error('Error:', error.message);
      }
    }

    // If the item was found in our DynamoDB database
    let response = new Response(JSON.stringify({data: itemData}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
}  