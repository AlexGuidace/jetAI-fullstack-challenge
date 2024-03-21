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

  // Lowercase the search term to prepare it for prompt.
  const searchTerm = selectedSearchTerm.toLowerCase();

  console.log('From Gemini function:');
  console.log(`CHECKED JETS: ${JSON.stringify(checkedJetsArray)}`);
  console.log(`SELECTED SEARCH TERM: ${searchTerm}`);

  let prompt = `I'd like an answer to each numbered question below. For each question return your answer in this format: a JavaScript object with three camelCased properties: name: the jet name--without its year--provided in the query, the numerical value that you've provided for ${searchTerm}, and its units. Put each of these objects into an array called ${searchTerm}AnswersArray. \n\n`;

  let jetIteration = 0;

  checkedJetsArray.forEach((jet) => {
    jetIteration++;

    if (searchTerm === 'top speed') {
      const topSpeedQuery = `What is the ${searchTerm}/max speed in mach units for the ${jet.name} manufactured in ${jet.year}, as provided by the ${jet.name} website? Round the max speed to the nearest hundredth decimal place.`;

      prompt += `${jetIteration}. ${topSpeedQuery} \n\n`;
    } else if (searchTerm === 'fuel efficiency') {
      // TODO: Gemini is giving me wildly different values on each request for "fuel efficieny" based on this prompt.
      const fuelEfficiencyQuery = `What is the ${searchTerm} in nm/gal units for a ${jet.name} manufactured in ${jet.year}, that has a typical cruise speed of 450 knots and full payload, based on ${jet.name} documentation?`;

      prompt += `${jetIteration}. ${fuelEfficiencyQuery} \n\n`;
    } else if (searchTerm === 'maximum seats') {
      // TODO: Gemini is giving me different values (off by one seat) based on this prompt.
      const maxSeatsQuery = `What are the ${searchTerm} on a ${jet.name} manufactured in ${jet.year}, as provided by the ${jet.name} website?`;

      prompt += `${jetIteration}. ${maxSeatsQuery} \n\n`;
    }
  });

  console.log(`COMPLETED PROMPT: \n\n ${prompt}`);

  try {
    const results = await model.generateContent(prompt);
    const geminiAnswersArray = results.response.text();
    console.log(geminiAnswersArray);
    return geminiAnswersArray;
  } catch (error) {
    console.error(`An error occurred while querying Gemini AI: ${error}`);
  }
};
