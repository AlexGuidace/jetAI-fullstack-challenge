'use client';

import { useState, ChangeEvent } from 'react';
import '../app/globals.css';
import { Jets } from '@/types/interfaces';
import { getComparisonDataFromGemini } from '@/app/api/geminiApiOps';
import { JetNameAndYear } from '@/types/interfaces';
import { GeminiAnswer } from '@/types/interfaces';
import Heading from './Heading';

const ComparisonTable: React.FC<{ geminiAnswersArray: GeminiAnswer[] }> = ({
  geminiAnswersArray,
}) => {
  const tableRows = geminiAnswersArray.map((jetAnswer, index) => (
    <tr key={jetAnswer.name}>
      <td>{index + 1}</td>
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
