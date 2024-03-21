import prisma from '@/db';
import { Jet } from '@/types/interfaces';

// Get all jet data from the DB Jet table.
export const getJetsFromDb = async (): Promise<Jet[]> => {
  try {
    const jets = await prisma.jet.findMany();
    return jets;
  } catch (error) {
    console.error(`Error occurred retrieving all jet data from DB: ${error}`);
    throw error;
  }
};
