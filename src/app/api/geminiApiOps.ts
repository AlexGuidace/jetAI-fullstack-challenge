import genAI from '../../../utils/geminiConfig';
import { JetNameAndYear } from '@/types/interfaces';
import { GeminiAnswer } from '@/types/interfaces';

const MODEL_NAME = 'gemini-1.0-pro';
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

export const getComparisonDataFromGemini = async (
  checkedJetsArray: JetNameAndYear[],
  selectedComparisonTerm: string
): Promise<GeminiAnswer[]> => {
  // Remove initial object used for useState() in JetsDataUserInterface component.
  if (checkedJetsArray[0].name === '') {
    checkedJetsArray.shift();
  }

  // Lowercase the search term to prepare it for prompt.
  const searchTerm = selectedComparisonTerm.toLowerCase();

  // Initial Gemini prompt detailing instructions for answering questions pertaining to each jet passed into this function, and how to format answers.
  let prompt = `I'd like an answer to each numbered question below. For each question return your answer in this format: a JavaScript object with three camelCased properties, each wrapped in a set of double quotes: 
  
  - name: the jet name--without its year--provided in the query,
  - an object called jetAttribute, with a property inside it called ${searchTerm}, in camelCase. This property should have a value of the numerical value that you've provided for ${searchTerm},
  - The ${searchTerm}'s units
  
  Put each of these objects into an unlabled array. Give the array back to me in plain text format. \n\n`;

  // Concatenate prompts to initial prompt based on jets and the comparison term passed in, e.g., if the search term passed in was 'top speed', we would concatenate the topSpeedQuery string--populated with a jet's properties--to the initial prompt, for each jet in our checkedJetsArray.
  let jetIteration = 0;
  checkedJetsArray.forEach((jet) => {
    jetIteration++;

    switch (searchTerm) {
      case 'top speed':
        const topSpeedQuery = `What is the ${searchTerm}/max speed in mach units for the ${jet.name} manufactured in ${jet.year}, as provided by the ${jet.name} website? Round the max speed to the nearest hundredth decimal place.`;

        prompt += `${jetIteration}. ${topSpeedQuery} \n\n`;
        break;
      case 'fuel efficiency':
        // TODO: Gemini is giving me wildly different values on each request for "fuel efficieny" based on this prompt.
        const fuelEfficiencyQuery = `What is the ${searchTerm} in nm/gal units for a ${jet.name} manufactured in ${jet.year}, that has a typical cruise speed of 450 knots and full payload, based on ${jet.name} documentation?`;

        prompt += `${jetIteration}. ${fuelEfficiencyQuery} \n\n`;
        break;
      case 'maximum seats':
        // TODO: Gemini is giving me different values (off by one seat) based on this prompt.
        const maxSeatsQuery = `What are the ${searchTerm} on a ${jet.name} manufactured in ${jet.year}, as provided by the ${jet.name} website?`;

        prompt += `${jetIteration}. ${maxSeatsQuery} \n\n`;
      default:
        // TODO: This is triggered when the unchecking-but-check-still-remains issue occurs in the Jets Table.
        console.log(
          'Something went wrong while concatenating queries to original Gemini prompt.'
        );
        break;
    }
  });

  console.log(`COMPLETED PROMPT............................: \n\n ${prompt}`);

  // With our fully-formed prompt, we make the call to Gemini to generate answers for us.
  try {
    const results = await model.generateContent(prompt);
    const geminiAnswersText = results.response.text();

    //  Parse the returned string response into an actual array.
    const geminiAnswersArray: GeminiAnswer[] = JSON.parse(geminiAnswersText);

    return geminiAnswersArray;
  } catch (error) {
    console.error(`An error occurred while querying Gemini AI: ${error}`);
    throw error;
  }
};
