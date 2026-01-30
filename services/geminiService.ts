import { GoogleGenAI } from "@google/genai";

export async function getDateInsight(date: string) {
  // Always use standard initialization from process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a very short, interesting historical fact or a fun trivia about the date ${date}. Keep it under 100 characters. No markdown.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 50,
      }
    });
    return response.text?.trim() || "A wonderful day to make history!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Every day is a gift!";
  }
}