import { NextRequest } from "next/server";
import { readItem } from "../utils";
import { GetItemCommandOutput } from "@aws-sdk/client-dynamodb";

export const GET = async(request: NextRequest) => {
    let upc_string: string | null = new URLSearchParams(request.url.split('?')[1]).get('upc_id');
    let upc_ID: number;

    if (upc_string) {
      // console.log("This is the beginning of the Identify_UPC Get Request " + upc_string)
      upc_ID = +upc_string;
    } else {
      throw new Error("WHY???");
    }
    
    let itemData: GetItemCommandOutput;
    itemData = await readItem("UPC", "UPC", "N", upc_ID);
    // console.log("DATA: ", itemData);
    
    if (!itemData.Item) {
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
        console.log("Edamam Data: ")
        console.log(data)
        if (!data.hints) {
          let errorString: string = "No item with that UPC found!";

          let response1 = new Response(JSON.stringify({data: errorString}), {
            status: 404,
            headers: {
            'Content-Type': 'application/json',
            },
          });

          return response1;
        } else {
          // console.log("true");
          let longIngredient: string = data.hints[0].food.knownAs.split(',')[0];
          console.log('Response2:', longIngredient);

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

          console.log("Here I am: ", shortName);

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
          //For final demo, change to data: shortIngredient with nlp model running on port 8000
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

    let response = new Response(JSON.stringify({data: itemData}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
}  