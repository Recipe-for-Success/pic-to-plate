import { NextRequest } from "next/server";
import { readBatch } from "../utils";
import { AttributeValue, BatchGetItemCommandOutput, GetItemCommandOutput } from "@aws-sdk/client-dynamodb";

type ingredientType = {
    ID: {S: string},
    recipes: {L: {N: number}[]}
}

type ingredientCountType = {
    ID: {S: string},
    counts: {L: {N: number}[]}
}

// Suggest recipes based on provided ingredients. 
export const GET = async(request: NextRequest) => {
    const searchParams = new URLSearchParams(request.url.split('?')[1]);
    let ingredients_string: string[] = searchParams.getAll("ID");

    const [itemData, countData] = await Promise.all([
        readBatch("Ingredient", "ID", "S", ingredients_string),
        readBatch("IngredientRecipeCounts", "ID", "S", ingredients_string)
    ]);

    // Make sure that the search for all ingredients was successful
    if (!(itemData.Responses?.Ingredient && countData.Responses?.IngredientRecipeCounts)) {
        return;
    }
    
    let ingredients = Array.from(itemData.Responses.Ingredient) as unknown as ingredientType[];
    let ingredientCounts = Array.from(countData.Responses.IngredientRecipeCounts) as unknown as ingredientCountType[];

    // Sort (alphabetically by ID - arbitrary) to ensure valid comparison between the two arrays 
    ingredients.sort((a, b) => a.ID.S.localeCompare(b.ID.S));
    ingredientCounts.sort((a, b) => a.ID.S.localeCompare(b.ID.S));

    // The dynamic count of ingredients in each recipe, the recipes that can be made, those needing 1 more ingredient, and those needing 2 more, respectively
    let dynamicRecipeCounts: { [key: number]: number } = {}, displayRecipes: number[] = [], oneMissing: number[] = [], twoMissing: number[] = [];

    for (let i = 0; i < ingredients?.length; i++) {
        for (let j = 0; ingredients[i]?.recipes.L && j < ingredients[i].recipes.L.length; j++) {
            if (ingredients[i] && ingredients[i].recipes.L[j]?.N && ingredientCounts[i]?.counts.L[j]?.N) {
                dynamicRecipeCounts[+ingredients[i].recipes.L[j].N] = +ingredientCounts[i].counts.L[j].N;
            } 
        }
    }

    // The fixed count of ingredients in each recipe
    const recipeCounts: { [key: number]: number } = {...dynamicRecipeCounts};

    // Counting down ingredients in each recipe
    for (let i of ingredients) {
        for (let j of i.recipes.L) {
            dynamicRecipeCounts[+j.N]--;
        }
    }

    for (let i of ingredients) {
        for (let j of i.recipes.L) {
            let newRecipe: number = +j.N;

            if (dynamicRecipeCounts[+j.N] == 0) {
                displayRecipes.push(newRecipe);
            } else if (dynamicRecipeCounts[+j.N] == 1) {
                oneMissing.push(newRecipe);
            } else if (dynamicRecipeCounts[+j.N] == 2) {
                twoMissing.push(newRecipe);
            }
        }
    }
    
    // Eliminate possible duplication
    displayRecipes = Array.from(new Set(displayRecipes));
    oneMissing = Array.from(new Set(oneMissing));
    twoMissing = Array.from(new Set(twoMissing));
    
    displayRecipes.sort((a, b) => recipeCounts[b] - recipeCounts[a]);
    oneMissing.sort((a, b) => recipeCounts[b] - recipeCounts[a]);
    twoMissing.sort((a, b) => recipeCounts[b] - recipeCounts[a]);

    let response = new Response(JSON.stringify({data: [displayRecipes, oneMissing, twoMissing]}), {
        status: 200,
        headers: {
        'Content-Type': 'application/json',
        },
    });

    return response;
}