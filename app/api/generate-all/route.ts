import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { rawText } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Ubah materi kesehatan reproduksi berikut menjadi skrip video edukasi singkat untuk remaja. 
    Buat menjadi 3 adegan saja. Berikan respon HANYA dalam format JSON:
    {
      "scenes": [
        { "text": "isi narasi", "visual": "deskripsi visual" }
      ]
    }
    Materi: ${rawText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanJson = response.text().replace(/```json|```/g, "");
    
    return NextResponse.json(JSON.parse(cleanJson));
  } catch (error) {
    return NextResponse.json({ error: "Gagal memproses AI" }, { status: 500 });
  }
}
