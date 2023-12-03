'use client'

import { useEffect, useState } from 'react';

type UPCInformation = {
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

const Test = () => {
    const [newItem, setNewItem] = useState<UPCInformation>();

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

                const newItemVal: UPCInformation = data.data.Item;
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

const PostTest = () => {
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                '/api/postTest',
                {
                    method: "POST"
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

const PutTest = () => {
    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(
                '/api/putTest',
                {
                    method: "PUT"
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

export default Test;