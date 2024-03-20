'use client';

import { useState } from 'react';
import '../app/globals.css';
import { Jets } from '@/types/interfaces';

const JetsTable: React.FC<Jets> = ({ jets }) => {
  const [checkedRowsArray, setCheckedRowsArray] = useState<string[]>([]);

  // Called when a JetTable's row's checkbox is clicked. It adds or removes a Jet name from an array.
  const handleCheckedRowChange = (passedName: string) => {
    // Check if the name is already in the array.
    const hasName = checkedRowsArray.includes(passedName);
    // If passedName is already in the array, then that means we added it previously, AND that its checkbox was just clicked on in the table (hence, why the name was passed in as passedName). We therefore need to remove the name from the array through the filter method.
    if (hasName) {
      setCheckedRowsArray(
        checkedRowsArray.filter((nameItem) => nameItem !== passedName)
      );
    } else {
      // If passedName is not in the array, that means its checkbox was previously unchecked, so we create a new array containing the new name, via the spread operator.
      setCheckedRowsArray([...checkedRowsArray, passedName]);
    }
  };

  console.log(checkedRowsArray);

  const tableRows = jets.map((row) => (
    <tr key={row.id}>
      <td>
        <input
          type="checkbox"
          className="w-5 h-5 accent-indigo-600"
          checked={checkedRowsArray.includes(row.name)}
          onChange={() => handleCheckedRowChange(row.name)}
        />
      </td>
      <td>{row.name}</td>
      <td>{row.wingspan}</td>
      <td>{row.engines}</td>
      <td>{row.year}</td>
    </tr>
  ));

  return (
    <table className="table-auto border-2 border-neutral-500 p-px mt-4">
      <thead>
        <tr>
          <th>Select</th>
          <th>Name</th>
          <th>Wingspan (ft)</th>
          <th>Number of Engines</th>
          <th>Manufacturing Year</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default JetsTable;
