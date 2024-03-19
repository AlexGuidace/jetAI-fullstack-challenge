import prisma from '@/db';
import Heading from '@/components/Heading';
import JetsTable from '@/components/JetsTable';

export default async function Homepage() {
  const jets = await prisma.jet.findMany();
  console.log(jets);

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
        <JetsTable />
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
}
