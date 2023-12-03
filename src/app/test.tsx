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
                `/api/identify_upc?upc_id=070847811169`,
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
                        ingredient: "pudding",
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
                `/api/getRecipe?recipe_id=` + String(337820),
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
                `/api/suggest_recipes?&ID=olive oil&ID=salt&ID=water&ID=warm water&ID=black pepper&ID=pepper&ID=onion&ID=garlic&ID=ground beef&ID=tomato&ID=sugar&ID=ketchup&ID=clove&ID=sauce&ID=curry powder&ID=lime&ID=basil&ID=oregano&ID=thyme&ID=butter&ID=ghee&ID=oil&ID=vegetable oil&ID=swiss cheese&ID=parmesan cheese&ID=ham slice&ID=flour&ID=dry white wine&ID=dried sage&ID=cornstarch&ID=condensed cream chicken soup&ID=chicken breast&ID=rice`,
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
                console.log('Response!!!!:', data);
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