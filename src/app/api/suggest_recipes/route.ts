import { NextRequest } from "next/server";
import { readBatch, readItem } from "../utils";
import { AttributeValue, BatchGetItemCommandOutput, GetItemCommandOutput } from "@aws-sdk/client-dynamodb";

export const GET = async(request: NextRequest) => {
    const searchParams = new URLSearchParams(request.url.split('?')[1]);
    let ingredients_string: string[] = searchParams.getAll("ID");

    let itemData: BatchGetItemCommandOutput;
    itemData = await readBatch("Ingredient", "ID", "S", ingredients_string);
    
    let ingredients = itemData.Responses?.Ingredient;
    let data: AttributeValue[] = [];

    if (ingredients) {
      for (let i of ingredients) {
        if (i && i.recipes) {
          data.push(i.recipes);
        }
      }
    }

    const combinedList: number[] = Array.prototype.concat.apply([], data.map((item) => (item?.NS?.map(Number) ?? []) as number[]));

    console.log(combinedList);

    let recipeData: BatchGetItemCommandOutput;
    recipeData = await readBatch("Recipe", "ID", "N", combinedList);

    let myMap: { [key: number]: number } = {};
    let displayRecipes: number[] = [];

    if (!recipeData.Responses) {
      throw new Error("why?")
    } else {
      for (let i of recipeData.Responses.Recipe) {
        if (i && i.ID && i.ID.N) {
          myMap[+i.ID.N] = i.ingredients.SS?.length?? -1;
        }
      }
    }

    console.log("MAP1", myMap);

    if (ingredients) {
      for (let i of ingredients) {
        if (i && i.recipes && i.recipes.NS) {
          for (let j of i.recipes.NS) {
            if (j) {
              myMap[+j]--;

              if (myMap[+j] == 0) {
                let newRecipe: number = +j;
                displayRecipes.push(newRecipe);
              }
            }
          }
        }
      }
    }

    console.log("MAP2", myMap);

    let response = new Response(JSON.stringify({data: myMap}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
}