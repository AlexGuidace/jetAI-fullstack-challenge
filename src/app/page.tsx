import Heading from '@/components/Heading';
import JetsTable from '@/components/JetsTable';
import { getJetsFromDb } from './api/crudOps';

const Homepage = async (): Promise<JSX.Element> => {
  // Get all jets and pass them to the JetsTable.
  const jets = await getJetsFromDb();

  return (
    <>
      <Heading
        title="AI-Powered Jet Comparison Tool"
        fontSize="text-3xl"
        alignment="text-center"
      />
      <div className="px-10 mx-auto">
        <Heading
          title="Top 10 Charter Jets"
          fontSize="text-xl"
          alignment="text-left"
        />
        {/* static table component for displaying imported CSV data with checkboxes */}
        <JetsTable jets={jets} />
        {/* user form component for selecting and submitting attributes */}
        <Heading
          title="Comparison Results"
          fontSize="text-xl"
          alignment="text-left"
        />
        {/* dynamic table component for sorting and comparing OpenAI API jet data results */}
      </div>
    </>
  );
};

export default Homepage;
