import prisma from '@/db';
import { Jet } from '@/types/interfaces';

// Get all jet data from the Jet table in the DB.
export const getJetsFromDb = async (): Promise<Jet[]> => {
  try {
    const jets = await prisma.jet.findMany();
    return jets;
  } catch (error) {
    console.error(`Error occurred retrieving all jet data from DB: ${error}`);
    throw error;
  }
};
