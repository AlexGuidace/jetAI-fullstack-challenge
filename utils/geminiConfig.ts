// node --version # Should be >= 18
// npm install @google/generative-ai

const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(API_KEY);

export default genAI;
