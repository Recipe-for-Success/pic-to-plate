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

export const GET = async(request: NextRequest) => {
    const searchParams = new URLSearchParams(request.url.split('?')[1]);
    let ingredients_string: string[] = searchParams.getAll("ID");

    const [itemData, countData] = await Promise.all([
        readBatch("Ingredient", "ID", "S", ingredients_string),
        readBatch("IngredientRecipeCounts", "ID", "S", ingredients_string)
    ]);

    if (!(itemData.Responses?.Ingredient && countData.Responses?.IngredientRecipeCounts)) {
        return;
    }
    
    let ingredients = Array.from(itemData.Responses.Ingredient) as unknown as ingredientType[];
    let ingredientCounts = Array.from(countData.Responses.IngredientRecipeCounts) as unknown as ingredientCountType[];

    ingredients.sort((a, b) => a.ID.S.localeCompare(b.ID.S));
    ingredientCounts.sort((a, b) => a.ID.S.localeCompare(b.ID.S));

    let dynamicRecipeCounts: { [key: number]: number } = {}, displayRecipes: number[] = [], oneMissing: number[] = [], twoMissing: number[] = [];

    for (let i = 0; i < ingredients?.length; i++) {
        for (let j = 0; ingredients[i]?.recipes.L && j < ingredients[i].recipes.L.length; j++) {
            if (ingredients[i] && ingredients[i].recipes.L[j]?.N && ingredientCounts[i]?.counts.L[j]?.N) {
                dynamicRecipeCounts[+ingredients[i].recipes.L[j].N] = +ingredientCounts[i].counts.L[j].N;
            } 
        }
    }

    const recipeCounts: { [key: number]: number } = {...dynamicRecipeCounts};

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