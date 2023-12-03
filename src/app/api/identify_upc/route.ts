import { NextRequest } from "next/server";
import { readItem } from "../utils";
import { GetItemCommandOutput } from "@aws-sdk/client-dynamodb";

export const GET = async(request: NextRequest) => {
    let upc_string: string | null = new URLSearchParams(request.url.split('?')[1]).get('upc_id');
    let upc_ID: number;

    if (upc_string) {
      upc_ID = +upc_string;
    } else {
      throw new Error("WHY???");
    }
    
    let itemData: GetItemCommandOutput;
    itemData = await readItem("UPC", "UPC", "N", upc_ID);

    let response = new Response(JSON.stringify({data: itemData}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
}  