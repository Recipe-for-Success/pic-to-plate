import { NextRequest } from "next/server";

type ImageBase64 = {
  data: string;
};

export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.text();
    const imageData: ImageBase64 = JSON.parse(requestBody);

    console.log("Here1: ", imageData, imageData.data);

    const formData = new URLSearchParams({
      image: imageData.data,
    });

    console.log(formData.toString());

    const imageResponse = await fetch('http://localhost:8000/recognize_image', {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (imageResponse.ok) {
      const responseBody = await imageResponse.text();
      console.log("Here2: ", responseBody);

      const response = new Response(responseBody, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Here3: ", response);

      return response;
    } else {
      console.error('Error:', imageResponse.statusText);
      return new Response(JSON.stringify({ image: "null!" }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

  } catch (error: any) {
    console.error('Error:', error.message);
    return new Response(JSON.stringify({ image: "null!" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
