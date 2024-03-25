// A file for configuring the Gemini AI API.
// [Google Gemini AI API](https://ai.google.dev/?gad_source=1&gclid=CjwKCAjwnv-vBhBdEiwABCYQA37TX9Um_QlzdGj1ui0bhhIVURwZrsFOsOUCRvNZlzLpwPgLzrp6zhoCQtsQAvD_BwE)
// node --version # Should be >= 18
// npm install @google/generative-ai

const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(API_KEY);

export default genAI;
