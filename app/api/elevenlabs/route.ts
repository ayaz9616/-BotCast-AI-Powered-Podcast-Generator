import { NextResponse } from "next/server";
import {ElevenLabsClient} from "elevenlabs";
import { Readable } from "stream";

export const POST = async (request: Request) => {
    try{
        const { input, voice } = await request.json();

        const elevenlabs = new ElevenLabsClient({
            apiKey: process.env.ELEVENLABS_API_KEY,
        });
        
        const audioResponse: any = await elevenlabs.generate({
            voice: voice,
            text: input,
            model_id: "eleven_monolingual_v1",
        });

        const readableAudio = Readable.from(audioResponse);
        const chunks = [];

        for await (const chunk of readableAudio) {
        chunks.push(chunk);
        }
        // Convert chunks to a Buffer
        const audioBuffer = Buffer.concat(chunks);

        // Debug: log buffer size and first bytes as text
        console.log('ElevenLabs audioBuffer size:', audioBuffer.length);
        if (audioBuffer.length < 100) {
            console.error('Audio buffer too small, possible error:', audioBuffer.toString('utf8'));
            return NextResponse.json({ error: 'Audio generation failed: empty or invalid audio', details: audioBuffer.toString('utf8') }, { status: 500 });
        }

        // Convert Buffer to Uint8Array for NextResponse
        return new NextResponse(new Uint8Array(audioBuffer), {
        headers: {
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': 'attachment; filename="audio.mp3"',
        },
        });
    } catch (error: any) {
        console.log("ERROR : ", error)
        return NextResponse.json({ error: error.message })
    }
}