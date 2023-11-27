'use client'

import { useEffect, useState } from 'react';

type UPCData = {
    UPC: {
        N: number
    },
    ingredient: {
        S: String
    },
    productName: {
        S: String
    }
}

type RecipeData = {
    ID: number;
}

type IngredientData = {
    ID: string;
}

const IdentifyUPC = () => {
    const [newItem, setNewItem] = useState<UPCData>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `/api/identify_upc?upc_id=` + String(111122223333),
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            try {
                const responseBody = await response.text();

                const data = JSON.parse(responseBody);
                console.log('Response:', data);

                const newItemVal: UPCData = data.data.Item;
                setNewItem(newItemVal);
            } catch (error: any) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <p>This works!</p>
            <p>UPC : {newItem ? (newItem.UPC.N) : null}</p>
            <p>Ingredient : {newItem ? (newItem.ingredient.S) : null}</p>
            <p>Product Name : {newItem ? (newItem.productName.S) : null}</p>
        </>
    );
};

const IdentifyImage = () => {
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                '/api/identify_image',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        data: "TestImage64",
                    })
                }
            );

            try {
                const responseBody = await response.text();

                const data = JSON.parse(responseBody);
                console.log('Response:', data);
            } catch (error: any) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <p>Posting!!!</p>
        </>
    );
};

const SubmitUPC = () => {
    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(
                '/api/submit_upc',
                {
                    method: "PUT",
                    body: JSON.stringify({
                        upc_id: 123,
                        updateExpression: "set ingredient = :newIngredient, productName = :newIngredient",
                        expression: { ":newIngredient": { S: "Weird Ingredient" }, }
                    })
                }
            );

            try {
                const responseBody = await response.text();

                const data = JSON.parse(responseBody);
                console.log('Response:', data);
            } catch (error: any) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <p>Putting!!!</p>
        </>
    );
};

const DeleteTest = () => {
    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(
                '/api/deleteTest',
                {
                    method: "DELETE"
                }
            );

            try {
                const responseBody = await response.text();

                const data = JSON.parse(responseBody);
                console.log('Response:', data);
            } catch (error: any) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <p>Deleting!!!</p>
        </>
    );
};

const GetRecipe = () => {
    const [newItem, setNewItem] = useState<RecipeData>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `/api/getRecipe?recipe_id=` + String(261450),
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            try {
                const responseBody = await response.text();

                const data = JSON.parse(responseBody);
                console.log('Response:', data);

                // const newItemVal: RecipeData = data.data.Item;
                // setNewItem(newItemVal);
            } catch (error: any) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <p>This works!</p>
        </>
    );
};

const SuggestRecipes = () => {
    const [newItem, setNewItem] = useState<IngredientData>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `/api/suggest_recipes?&ID=szechuan chile flake&ID=turkey chili without bean&ID=chocolate pastry cream&ID=knorr parma rosa sauce mix&ID=venison shoulder&ID=tricolored fusilli&ID=cocacola classic`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            try {
                const responseBody = await response.text();

                const data = JSON.parse(responseBody);
                console.log('Response:', data);

                // const newItemVal: IngredientData = data.data.Responses;
                // setNewItem(newItemVal);
            } catch (error: any) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <p>This works!</p>
        </>
    );
}

const SubmitImage = () => {
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                '/api/submit_image',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        data: "TestImage64",
                        ingredient: "TestIng!!!"
                    })
                }
            );

            try {
                const responseBody = await response.text();

                const data = JSON.parse(responseBody);
                console.log('Response:', data);
            } catch (error: any) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <p>Posting!!!</p>
        </>
    );
};

export default SuggestRecipes;