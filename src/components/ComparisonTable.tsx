'use client';

import { useState, ChangeEvent } from 'react';
import '../app/globals.css';
import { Jets } from '@/types/interfaces';
import { getComparisonDataFromGemini } from '@/app/api/geminiApiOps';
import { JetNameAndYear } from '@/types/interfaces';
import { GeminiAnswer } from '@/types/interfaces';

const ComparisonTable: React.FC<Jets> = ({ jets }) => {
  const [checkedJetsArray, setCheckedJetsArray] = useState<JetNameAndYear[]>([
    { name: '', year: '' },
  ]);
  const [selectedComparisonTerm, setSelectedComparisonTerm] =
    useState<string>('Top Speed');
  const [geminiAnswersArray, setGeminiAnswersArray] = useState<GeminiAnswer[]>([
    { name: '', jetAttribute: {}, units: '' },
  ]);

  console.log('Initial checkedJetsArray:', checkedJetsArray);

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

  //  Sends checkedJetsArray and selectedSearchTerm to Gemini AI function, so Gemini can fetch information regarding jets the user checked.
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

    //  Get answers about selected jets from Gemini.
    const geminiAnswersArray = await getComparisonDataFromGemini(
      checkedJetsArray,
      selectedComparisonTerm
    );
    // Assign returned jet data to useState array for comparison sorting and ranking.
    setGeminiAnswersArray(geminiAnswersArray);
  };

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
      {/* Comparison Table */}
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
    </>
  );
};

export default ComparisonTable;
