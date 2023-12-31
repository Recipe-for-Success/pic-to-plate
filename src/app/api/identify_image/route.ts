import { NextRequest } from "next/server";

type ImageBase64 = {
  data: string;
};

// Pass ingredient image data to model server and get back and return the identified ingredient name. 
export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.text();
    const imageData: ImageBase64 = JSON.parse(requestBody);

    const formData = new URLSearchParams({
      image: imageData.data,
    });

    // Uploading image to model server
    const imageResponse = await fetch('http://localhost:8000/recognize_image', {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({data: formData.toString().split("image=")[1]}),
    });

    if (imageResponse.ok) {
      const responseBody = await imageResponse.text();

      const response = new Response(responseBody, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response;
    } else {
      console.error('Error:', imageResponse.statusText);
      
      return new Response(JSON.stringify({ image: "null" }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

  } catch (error: any) {
    console.error('Error:', error.message);

    return new Response(JSON.stringify({ image: "null" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
