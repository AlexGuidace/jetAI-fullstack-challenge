// A file for any database CRUD functionality.

import prisma from '@/db';
import { Jet } from '@/types/interfaces';

// Get all jet data from the DB Jet table.
export const getJetsFromDb = async (): Promise<Jet[]> => {
  try {
    const jets = await prisma.jet.findMany({
      orderBy: {
        wingspan: 'desc',
      },
    });

    // Convert Prisma Decimal type 'wingspan' to Number to avoid Prisma warning on only passing plain objects from Server Components to Client Components.
    const jetsWithWingspanConverted = jets.map((jet) => ({
      ...jet,
      wingspan: jet.wingspan.toNumber(),
    }));

    return jetsWithWingspanConverted;
  } catch (error) {
    console.error(`Error occurred retrieving all jet data from DB: ${error}`);
    throw error;
  }
};
