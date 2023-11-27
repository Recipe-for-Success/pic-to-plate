import { NextRequest } from "next/server";

type imageBase64 = {
    data: string
    ingredient: string
}

export const POST = async(request: NextRequest) => {
    const requestBody = await request.text();
    const imageData: imageBase64 = JSON.parse(requestBody);

    console.log("Here1: ", imageData, imageData.data);

    const imageResponse = await fetch(
        'https://www.toptal.com/developers/postbin/1701079907183-2279662012588',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: imageData.data,
                ingredient: imageData.ingredient
            })
        }
    );

    console.log("Here2: ", imageResponse);

    let response = new Response(JSON.stringify({data: imageResponse}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("Here3: ", response);

    return response;
}