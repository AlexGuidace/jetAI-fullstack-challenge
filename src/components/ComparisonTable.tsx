'use client';

import '../app/globals.css';
import { GeminiAnswer } from '@/types/interfaces';
import Heading from './Heading';

const ComparisonTable: React.FC<{ geminiAnswersArray: GeminiAnswer[] }> = ({
  geminiAnswersArray,
}) => {
  let doesArrayHaveJetData = false;
  let isTopSpeedProperty = false;
  let isFuelEfficiencyProperty = false;
  let isMaximumSeatsProperty = false;

  // Make sure comparison table doesn't render rows until the Gemini jet data has been fetched.
  if (geminiAnswersArray[0].name !== '') {
    doesArrayHaveJetData = true;

    // Set jet attribute properties for conditional rendering of those property values in the comparison table.
    if (geminiAnswersArray[0].jetAttribute.hasOwnProperty('topSpeed')) {
      isTopSpeedProperty = true;
    } else if (
      geminiAnswersArray[0].jetAttribute.hasOwnProperty('fuelEfficiency')
    ) {
      isFuelEfficiencyProperty = true;
    } else if (
      geminiAnswersArray[0].jetAttribute.hasOwnProperty('maximumSeats')
    ) {
      isMaximumSeatsProperty = true;
    }
  } else {
    doesArrayHaveJetData = false;
  }

  const tableRows = geminiAnswersArray.map((jetAnswer, index) => (
    <tr key={jetAnswer.name}>
      <td>{index + 1}</td>
      <td>{jetAnswer.name}</td>
      <td>
        {/* Display jet attribute data based on attribute that was compared by user. */}
        {isTopSpeedProperty ? (
          <>
            {'Mach'} {jetAnswer.jetAttribute.topSpeed}
          </>
        ) : isFuelEfficiencyProperty ? (
          <>
            {jetAnswer.jetAttribute.fuelEfficiency} {'nm/gal '}
            <i>(nautical miles per gallon)</i>
          </>
        ) : isMaximumSeatsProperty ? (
          <>
            {jetAnswer.jetAttribute.maximumSeats} {'seats'}
          </>
        ) : (
          ''
        )}
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
      <table className="table-auto border border-black p-px mt-4 mb-8">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Jet Name</th>
            <th>
              {/* If we have no jet answers yet, this column will have a title of 'Value'. Otherwise, the title will display the name of the attribute the user compared. */}
              {doesArrayHaveJetData && isTopSpeedProperty
                ? 'Top Speed'
                : doesArrayHaveJetData && isFuelEfficiencyProperty
                ? 'Fuel Efficiency'
                : doesArrayHaveJetData && isMaximumSeatsProperty
                ? 'Maximum Seats'
                : 'Value'}
            </th>
          </tr>
        </thead>
        <tbody>{doesArrayHaveJetData ? tableRows : ''}</tbody>
      </table>
    </>
  );
};

export default ComparisonTable;
