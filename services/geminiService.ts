
import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key not found");
  return new GoogleGenAI({ apiKey });
};

export const generateCreativeResponse = async (userPrompt: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: "You are Lumina, a world-class creative design consultant. Help the user with web design, brand strategy, or UX ideas. Keep responses concise, inspiring, and professional.",
        temperature: 0.7,
        topK: 40,
        topP: 0.9,
      }
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm experiencing a bit of a creative block. Please try again in a moment!";
  }
};
