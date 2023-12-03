import { NextRequest } from "next/server";
import { readBatch } from "../utils";
import { AttributeValue, BatchGetItemCommandOutput, GetItemCommandOutput } from "@aws-sdk/client-dynamodb";

export const GET = async(request: NextRequest) => {
    const searchParams = new URLSearchParams(request.url.split('?')[1]);
    let ingredients_string: string[] = searchParams.getAll("ID");

    // let itemData: BatchGetItemCommandOutput, countData: BatchGetItemCommandOutput;
    const [itemData, countData] = await Promise.all([
        readBatch("Ingredient", "ID", "S", ingredients_string),
        readBatch("IngredientRecipeCounts", "ID", "S", ingredients_string)
    ]);

    let junk: any[] = ["cooking spray","cornmeal","italian seasoning","mozzarella cheese","mushroom","skim milk","tomato sauce","turkey pepperoni","unsweetened applesauce","vidalia onion","water","white flour","yeast"];
    console.log("HELOOOOOOO!OO!!!: ", junk.length);
    let ingredients: Record<string, AttributeValue>[] = Array.from(itemData.Responses.Ingredient);
    let ingredientCounts: Record<string, AttributeValue>[] = Array.from(countData.Responses.IngredientRecipeCounts);

    ingredients.sort((a, b) => a.ID.S.localeCompare(b.ID.S));
    console.log("NEWITEMS 1 1 1 1 NOW: ", ingredients[ingredients.length - 1], "   ", ingredients[ingredients.length - 1].recipes.L );

    ingredientCounts.sort((a, b) => a.ID.S.localeCompare(b.ID.S));
    console.log("NEWCOUNTS 1 1 1 1 NOW: ", ingredientCounts[ingredientCounts.length - 1],"   ", ingredientCounts[ingredientCounts.length - 1].counts.L);



    let myMap: { [key: number]: number } = {}, countMap: { [key: number]: number } = {}, displayRecipes: number[] = [], oneDown: number[] = [], twoDown: number[] = [];

    for (let i = 0; i < ingredients?.length; i++) {
        for (let j = 0; ingredients[i]?.recipes.L && j < ingredients[i].recipes.L.length; j++) {
            if (ingredients[i] && ingredients[i].recipes.L[j]?.N && ingredientCounts[i]?.counts.L[j]?.N) {
                myMap[+ingredients[i].recipes.L[j].N] = +ingredientCounts[i].counts.L[j].N;
            } 
        }
    }

    countMap = {...myMap};

    for (let i of ingredients) {
        for (let j of i.recipes.L) {
            myMap[+j.N]--;
        }
    }

    for (let i of ingredients) {
        for (let j of i.recipes.L) {
            let newRecipe: number = +j.N;

            if (myMap[+j.N] == 0) {
                displayRecipes.push(newRecipe);
            } else if (myMap[+j.N] == 1) {
                oneDown.push(newRecipe);
            } else if (myMap[+j.N] == 2) {
                twoDown.push(newRecipe);
            }
        }
    }
    displayRecipes = Array.from(new Set(displayRecipes));
    oneDown = Array.from(new Set(oneDown));
    twoDown = Array.from(new Set(twoDown));
    
    displayRecipes.sort((a, b) => countMap[b] - countMap[a]);
    oneDown.sort((a, b) => countMap[b] - countMap[a]);
    twoDown.sort((a, b) => countMap[b] - countMap[a]);

    let response = new Response(JSON.stringify({data: [displayRecipes, oneDown, twoDown]}), {
        status: 200,
        headers: {
        'Content-Type': 'application/json',
        },
    });

    return response;
}