'use client';

import '../app/globals.css';
import { GeminiAnswer } from '@/types/interfaces';
import Heading from './Heading';

const ComparisonTable: React.FC<{ geminiAnswersArray: GeminiAnswer[] }> = ({
  geminiAnswersArray,
}) => {
  // Make sure ComponentTable doesn't render with a "rank #" when the app first loads and the Gemini jet data has not yet been fetched.
  let doesArrayHaveJetData: boolean;
  if (geminiAnswersArray[0].name !== '') {
    doesArrayHaveJetData = true;
  } else {
    doesArrayHaveJetData = false;
  }

  const tableRows = geminiAnswersArray.map((jetAnswer, index) => (
    <tr key={jetAnswer.name}>
      <td>{doesArrayHaveJetData ? index + 1 : ''}</td>
      <td>{jetAnswer.name}</td>
      <td>
        {jetAnswer.jetAttribute.fuelEfficiency} {jetAnswer.units}
      </td>
    </tr>
  ));

  return (
    <>
      {/* Comparison Table */}
      <Heading
        title="Comparison Results"
        fontSize="text-xl"
        alignment="text-left"
      />
      <table className="table-auto border-2 border-neutral-500 p-px mt-4 mb-8">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
};

export default ComparisonTable;
