import { NextResponse } from "next/server";
import {ElevenLabsClient} from "elevenlabs";
import { Readable } from "stream";

export const POST = async (request: Request) => {
    try{
        const { input } = await request.json();

        const token = process.env.HUGGINGFACE_API_KEY

        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({"inputs": input}),
            }
          );

          // Convert the response to a Blob
        if (!response.ok) {
          const errorText = await response.text();
          console.error('HuggingFace API error:', errorText);
          return NextResponse.json({ error: 'Image generation failed', details: errorText }, { status: 500 });
        }
        const blob = await response.blob();
        if (!blob || blob.size < 1000) {
          console.error('Image blob too small or empty');
          return NextResponse.json({ error: 'Image generation failed: empty or invalid image' }, { status: 500 });
        }
        const buffer = await blob.arrayBuffer();
        const imageName = `thumbnail.png`;
        const imageBuffer = Buffer.from(buffer);
        // Return the image as part of the response (convert Buffer to Uint8Array for Next.js Response)
        return new Response(new Uint8Array(imageBuffer), {
          headers: {
            'Content-Type': 'image/png',
            'Content-Disposition': `attachment; filename="${imageName}"`,
          },
          status: 200,
        });
    } catch (error: any) {
        console.log("ERROR : ", error)
        return NextResponse.json({ error: error.message })
    }
}