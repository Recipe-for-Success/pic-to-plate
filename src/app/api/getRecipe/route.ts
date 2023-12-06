import { NextRequest } from "next/server";
import { readItem } from "../utils";
import { GetItemCommandOutput } from "@aws-sdk/client-dynamodb";

export const GET = async(request: NextRequest) => {
    let recipe_string: string | null = new URLSearchParams(request.url.split('?')[1]).get('recipe_id');
    let recipe_ID: number;

    if (recipe_string) {
      recipe_ID = +recipe_string;
    } else {
      throw new Error("Request missing or invalid");
    }

    let recipeData: GetItemCommandOutput
    recipeData = await readItem("Recipe", "ID", "N", recipe_ID);

    let response = new Response(JSON.stringify({data: recipeData}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
}
