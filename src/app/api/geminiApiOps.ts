import genAI from '../../../utils/geminiConfig';
import { JetNameAndYear } from '@/types/interfaces';

const MODEL_NAME = 'gemini-1.0-pro';
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

export const getInfoFromGemini = async (
  checkedJetsArray: JetNameAndYear[],
  selectedSearchTerm: string
) => {
  // Remove initial object used for useState() in JetsTable component.
  if (checkedJetsArray[0].name === '') {
    checkedJetsArray.shift();
  }

  console.log('From Gemini function:');
  console.log(`CHECKED JETS: ${JSON.stringify(checkedJetsArray)}`);
  console.log(`SELECTED SEARCH TERM: ${selectedSearchTerm}`);

  const prompt =
    'Answer this question: What is the top/max speed in mach for the Bombadier Global 7500 manufactured in 2018, as provided by the Bombadier website? Give me your reply in this format: Top Speed in Mach: numerical value';
  console.log(prompt);

  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  } catch (error) {
    console.error(`An error occurred while querying Gemini AI: ${error}`);
  }
};
