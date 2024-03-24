'use client';

import { useState, ChangeEvent } from 'react';
import '../app/globals.css';
import ComparisonTable from './ComparisonTable';
import { getComparisonDataFromGemini } from '@/app/api/geminiApiOps';
import { Jets } from '@/types/interfaces';
import { JetNameAndYear } from '@/types/interfaces';
import { GeminiAnswer } from '@/types/interfaces';

const JetsDataUserInterface: React.FC<Jets> = ({ jets }) => {
  const [checkedJetsArray, setCheckedJetsArray] = useState<JetNameAndYear[]>([
    { name: '', year: '' },
  ]);
  const [selectedComparisonTerm, setSelectedComparisonTerm] =
    useState<string>('Top Speed');
  const [geminiAnswersArray, setGeminiAnswersArray] = useState<GeminiAnswer[]>([
    { name: '', jetAttribute: {}, units: '' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Called when a JetTable's row's checkbox is clicked. It adds or removes a Jet name and its manufacturing year from an array.
  const handleCheckedJetRowChange = (
    passedName: string,
    year: string,
    checked: boolean
  ) => {
    if (checked) {
      // If the checkbox on the input for the jet passed into this function was checked (set to true), we add it to our checkedJetsArray.
      setCheckedJetsArray([
        ...checkedJetsArray,
        { name: passedName, year: year },
      ]);
    } else {
      // Otherwise, if the checkbox on the input for the jet passed into this function was unchecked (set to false), we remove that jet from our checkedJetsArray.
      setCheckedJetsArray(
        checkedJetsArray.filter((jet) => jet.name !== passedName)
      );
    }
  };

  //  Sets selected search term to be used in Gemini AI.
  const handleSearchTermChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedComparisonTerm(event.target.value);
  };

  // A function called within handleComparisonFormSubmit for sorting and ranking the jet comparison data returned by Gemini AI.
  const sortGeminiAnswers = (returnedGeminiAnswersArray: GeminiAnswer[]) => {
    // Sort array from highest to lowest (descending) for top speed in Mach, fuel efficiency in nautical miles per gallon (nm/gal), and maximum seats.
    if (
      returnedGeminiAnswersArray[0].jetAttribute.hasOwnProperty(
        'fuelEfficiency'
      )
    ) {
      returnedGeminiAnswersArray.sort((jetA, jetB) => {
        if (
          jetA.jetAttribute?.fuelEfficiency !== undefined &&
          jetB.jetAttribute?.fuelEfficiency !== undefined
        ) {
          return (
            jetB.jetAttribute.fuelEfficiency - jetA.jetAttribute.fuelEfficiency
          );
        } else {
          console.error(
            'No ranking of Gemini answers occurred because a jetAttribute.fuelEfficiency was undefined.'
          );
          return 0;
        }
      });
    } else if (
      returnedGeminiAnswersArray[0].jetAttribute.hasOwnProperty('topSpeed')
    ) {
      returnedGeminiAnswersArray.sort((jetA, jetB) => {
        if (
          jetA.jetAttribute?.topSpeed !== undefined &&
          jetB.jetAttribute?.topSpeed !== undefined
        ) {
          return jetB.jetAttribute.topSpeed - jetA.jetAttribute.topSpeed;
        } else {
          console.error(
            'No ranking of Gemini answers occurred because a jetAttribute.topSpeed was undefined.'
          );
          return 0;
        }
      });
    } else if (
      returnedGeminiAnswersArray[0].jetAttribute.hasOwnProperty('maximumSeats')
    ) {
      returnedGeminiAnswersArray.sort((jetA, jetB) => {
        if (
          jetA.jetAttribute?.maximumSeats !== undefined &&
          jetB.jetAttribute?.maximumSeats !== undefined
        ) {
          return (
            jetB.jetAttribute.maximumSeats - jetA.jetAttribute.maximumSeats
          );
        } else {
          console.error(
            'No ranking of Gemini answers occurred because a jetAttribute.maximumSeats was undefined.'
          );
          return 0;
        }
      });
    }

    return returnedGeminiAnswersArray;
  };

  //  Sends checkedJetsArray and selectedSearchTerm to Gemini AI function, so Gemini can fetch information regarding jets the user checked and return the results here. Then sort the results.
  const handleComparisonFormSubmit = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();

    try {
      // Initiate loading spinner while the request to Gemini AI is made.
      setIsLoading(true);

      // Validation for checking if array has only initial state or zero jets in it.
      if (
        (checkedJetsArray.length === 1 && checkedJetsArray[0].name === '') ||
        checkedJetsArray.length === 0
      ) {
        alert('Please select jets to compare.');
        return;
      }

      //  Get array of answers about selected jets from Gemini.
      const returnedGeminiAnswersArray = await getComparisonDataFromGemini(
        checkedJetsArray,
        selectedComparisonTerm
      );

      // Sort that array.
      const sortedGeminiAnswersArray = sortGeminiAnswers(
        returnedGeminiAnswersArray
      );

      setGeminiAnswersArray(sortedGeminiAnswersArray);
    } catch (error) {
      console.error(
        `Something went wrong after the user clicked the 'Compare Selected Jets' button: ${error}`
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  console.log('SORTED JETS ARRAY....................: ', geminiAnswersArray);

  const tableRows = jets.map((row) => (
    <tr key={row.id}>
      <td>
        <input
          type="checkbox"
          className="w-5 h-5 accent-sky-600"
          onChange={(e) =>
            handleCheckedJetRowChange(row.name, row.year, e.target.checked)
          }
        />
      </td>
      <td>{row.name}</td>
      <td>{row.wingspan}</td>
      <td>{row.engines}</td>
      <td>{row.year}</td>
    </tr>
  ));

  return (
    <>
      {/* Jets Table */}
      <table className="table-auto border border-black p-px mt-4">
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>
              Wingspan (ft) <i className="fas fa-caret-down"></i>
            </th>
            <th>Number of Engines</th>
            <th>Manufacturing Year</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      {/* Selected Jets Comparison Form */}
      <form className="flex-col py-4">
        <div className="pb-3 whitespace-nowrap">
          <label htmlFor="select-menu" className="pr-2">
            Ask Gemini AI to Compare Selected Jets By
          </label>
          <select
            id="select-menu"
            value={selectedComparisonTerm}
            onChange={handleSearchTermChange}
            className="p-2 bg-transparent focus:outline-none border border-black rounded-md"
          >
            <option value="Top Speed">Top Speed</option>
            <option value="Fuel Efficiency">Fuel Efficiency</option>
            <option value="Maximum Seats">Maximum Seats</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          onClick={handleComparisonFormSubmit}
          className="bg-transparent p-2 hover:bg-sky-600 hover:border-sky-600 hover:text-white border border-black rounded-md"
        >
          <span>Compare Selected Jets</span>
        </button>
        {isLoading && (
          <div className="bg-sky-600 mt-4 p-2 block mx-auto rounded-lg w-64">
            <div className="p-4 text-center">
              <i className="fa-solid fa-spinner fa-2xl text-white animate-spin"></i>
              <span className="text-white font-semibold pl-3">
                Comparing Jets...
              </span>
            </div>
          </div>
        )}
      </form>
      <ComparisonTable geminiAnswersArray={geminiAnswersArray} />
    </>
  );
};

export default JetsDataUserInterface;
