'use client'

// export default function Test() {
//     const data = fetch("./api/getTest")
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.error('Error:', error));

//     return (
//         <>
//             <p>This works!</p>
//         </>
//     )
// }
// test.tsx

import { useEffect } from 'react';

const Test: React.FC = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/getTest');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const contentType = response.headers.get('Content-Type');

                if (!contentType) {
                    throw new Error('Invalid or missing Content.-.Type header');
                }

                const responseBody = await response.text();

                if (!responseBody.trim()) {
                    throw new Error('Empty response received');
                }

                // Parse JSON
                const data = JSON.parse(responseBody);
                console.log('Response:', data);
            } catch (error: any) {
                if (error instanceof SyntaxError) {
                    console.error('Error: Invalid JSON');
                } else {
                    console.error('Error:', error.message);
                }
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

const PostTest: React.FC = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    '/api/postTest',
                    {
                        method: "POST"
                    }
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const contentType = response.headers.get('Content-Type');

                if (!contentType) {
                    throw new Error('Invalid or missing Content.-.Type header');
                }

                const responseBody = await response.text();

                if (!responseBody.trim()) {
                    throw new Error('Empty response received');
                }

                // Parse JSON
                const data = JSON.parse(responseBody);
                console.log('Response:', data);
            } catch (error: any) {
                if (error instanceof SyntaxError) {
                    console.error('Error: Invalid JSON');
                } else {
                    console.error('Error:', error.message);
                }
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

const PutTest: React.FC = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    '/api/putTest',
                    {
                        method: "PUT"
                    }
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const contentType = response.headers.get('Content-Type');

                if (!contentType) {
                    throw new Error('Invalid or missing Content.-.Type header');
                }

                const responseBody = await response.text();

                if (!responseBody.trim()) {
                    throw new Error('Empty response received');
                }

                // Parse JSON
                const data = JSON.parse(responseBody);
                console.log('Response:', data);
            } catch (error: any) {
                if (error instanceof SyntaxError) {
                    console.error('Error: Invalid JSON');
                } else {
                    console.error('Error:', error.message);
                }
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

const DeleteTest: React.FC = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    '/api/deleteTest',
                    {
                        method: "DELETE"
                    }
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const contentType = response.headers.get('Content-Type');

                if (!contentType) {
                    throw new Error('Invalid or missing Content.-.Type header');
                }

                const responseBody = await response.text();

                if (!responseBody.trim()) {
                    throw new Error('Empty response received');
                }

                // Parse JSON
                const data = JSON.parse(responseBody);
                console.log('Response:', data);
            } catch (error: any) {
                if (error instanceof SyntaxError) {
                    console.error('Error: Invalid JSON');
                } else {
                    console.error('Error:', error.message);
                }
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

export default PutTest;