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

  // Called when a JetTable's row's checkbox is clicked. It adds or removes a Jet name and its manufacturing year from an array.
  const handleCheckedJetRowChange = (passedName: string, year: string) => {
    checkedJetsArray.forEach((jet) => {
      // If passedName is already in the array, then that means we added this jet previously, AND that its checkbox was just clicked on in the table (hence, why the jet values were passed into this function). We therefore need to remove the jet from the array through the filter method.
      if (jet.name === passedName) {
        setCheckedJetsArray(
          checkedJetsArray.filter((jet) => jet.name !== passedName)
        );
        // TODO: I sometimes have to click the box twice to uncheck it, if I've pressed submit button on comparison form.
        // TODO: When checking a box or boxes, clicking submit, then checking it again, nothing happens to said box. It doesn't become "checked" and state doesn't change. The only way to renable correct behavior is by refreshing page.
      } else {
        // If passedName is not in the array, that means the jet's checkbox was previously unchecked, so we create a new array containing the new jet object, via the spread operator, and set checkedJetsArray to the new array.
        setCheckedJetsArray([
          ...checkedJetsArray,
          { name: passedName, year: year },
        ]);
      }
    });
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
  };

  console.log('SORTED JETS ARRAY....................: ', geminiAnswersArray);

  const tableRows = jets.map((row) => (
    <tr key={row.id}>
      <td>
        <input
          type="checkbox"
          className="w-5 h-5 accent-indigo-600"
          checked={checkedJetsArray.some((jet) => jet.name === row.name)}
          onChange={() => handleCheckedJetRowChange(row.name, row.year)}
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
      <table className="table-auto border-2 border-neutral-500 p-px mt-4">
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
        <div className="relative h-10 w-72 min-w-[200px] my-4">
          <select
            id="selected"
            value={selectedComparisonTerm}
            onChange={handleSearchTermChange}
            className="peer h-full w-full rounded-[7px] border-2 border-neutral-500 border-t-transparent bg-transparent px-3 py-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          >
            <option value="Top Speed">Top Speed</option>
            <option value="Fuel Efficiency">Fuel Efficiency</option>
            <option value="Maximum Seats">Maximum Seats</option>
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Ask Gemini AI to Compare Selected Jets By
          </label>
        </div>
        <button
          type="submit"
          onClick={handleComparisonFormSubmit}
          className="px-1 py-1 border-2 border-neutral-500 rounded-[7px]"
        >
          Compare Selected Jets
        </button>
      </form>
      <ComparisonTable geminiAnswersArray={geminiAnswersArray}  />
    </>
  );
};

export default JetsDataUserInterface;
