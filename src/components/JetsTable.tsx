import prisma from '@/db';
import '../app/globals.css';

const JetsTable = async (): Promise<JSX.Element> => {
  const jets = await prisma.jet.findMany();
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
      <tbody>
        {jets.map((row) => (
          <tr key={row.id}>
            <td>
              <input type="checkbox" className="w-5 h-5 accent-indigo-600" />
            </td>
            <td>{row.name}</td>
            <td>{row.wingspan}</td>
            <td>{row.engines}</td>
            <td>{row.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JetsTable;
