import { GoogleGenAI, Type } from "@google/genai";
import type { CalorieResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const calorieResponseSchema = {
    type: Type.OBJECT,
    properties: {
        totalCalories: {
            type: Type.NUMBER,
            description: "Total estimated calories for the entire meal."
        },
        items: {
            type: Type.ARRAY,
            description: "A list of food items from the input with their estimated calories.",
            items: {
                type: Type.OBJECT,
                properties: {
                    food: {
                        type: Type.STRING,
                        description: "Name of the food item."
                    },
                    calories: {
                        type: Type.NUMBER,
                        description: "Estimated calories for this item."
                    }
                },
                required: ["food", "calories"]
            }
        },
        advice: {
            type: Type.STRING,
            description: "A short, helpful nutritional advice based on the meal, written in a friendly and encouraging tone."
        }
    },
    required: ["totalCalories", "items", "advice"]
};

const fileToGenerativePart = (base64: string, mimeType: string) => {
    return {
        inlineData: {
            data: base64,
            mimeType
        },
    };
};


export const calculateCaloriesFromGemini = async (
    foodInput: string,
    imageBase64?: string,
    imageMimeType?: string
): Promise<CalorieResponse> => {

    const model = 'gemini-2.5-flash';
    const parts: any[] = [];
    let basePrompt = `You are an expert nutritionist AI named NutraMind. Your task is to analyze the user's meal and estimate the total calories. Provide a breakdown for each item and offer a brief, positive piece of advice. Return the analysis in a structured JSON format.`;

    if (imageBase64 && imageMimeType) {
        parts.push(fileToGenerativePart(imageBase64, imageMimeType));
        parts.push({ text: `Analyze the food in the image. The user provided this extra context: "${foodInput}". ${basePrompt}` });
    } else {
        parts.push({ text: `Analyze this meal description: "${foodInput}". ${basePrompt}` });
    }

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: parts },
            config: {
                responseMimeType: "application/json",
                responseSchema: calorieResponseSchema,
                temperature: 0.2,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);

        if (
            typeof parsedResponse.totalCalories !== 'number' ||
            !Array.isArray(parsedResponse.items) ||
            typeof parsedResponse.advice !== 'string'
        ) {
            throw new Error("Invalid JSON structure received from API.");
        }
        
        return parsedResponse as CalorieResponse;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to fetch and parse calorie data from the AI model.");
    }
};


export const getAiSuggestion = async (userInput: string): Promise<string> => {
    const prompt = `You are a helpful AI assistant specializing in nutrition and meal planning called NutraMind. The user wants suggestions. User request: "${userInput}". Provide a friendly, helpful, and concise response. Use markdown for formatting lists or important points.`;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.7,
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for suggestions:", error);
        throw new Error("Failed to get suggestions from the AI model.");
    }
};