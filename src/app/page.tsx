import { getJetsFromDb } from './api/crudOps';
import Heading from '@/components/Heading';
import JetsDataUserInterface from '@/components/JetsDataUserInterface';

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
        <JetsDataUserInterface jets={jets} />
        <Heading
          title="Comparison Results"
          fontSize="text-xl"
          alignment="text-left"
        />
      </div>
    </>
  );
};

export default Homepage;
