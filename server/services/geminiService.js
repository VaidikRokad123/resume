import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildAnalysisPrompt } from '../utils/promptBuilder.js';
import { parseAnalysisResponse } from '../utils/responseParser.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeResume = async (resumeText, jobDescText) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096
      }
    });

    const prompt = buildAnalysisPrompt(resumeText, jobDescText);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const parsedData = parseAnalysisResponse(text);
    return parsedData;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('AI analysis failed: ' + error.message);
  }
};
