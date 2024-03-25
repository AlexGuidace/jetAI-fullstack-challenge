// A file that, on application start-up, imports CSV jet data and inserts it into the database.

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csvParser = require('csv-parser');

// Create interface to ensure objects being created in the DB adhere to the Jet Prisma model.
interface Jet {
  name: string;
  wingspan: number;
  engines: string;
  year: string;
}

const prisma = new PrismaClient();

// Parse CSV file and turn each row of data into a JetCsvRow object
const importCsvToDb = async (filePath: string): Promise<void> => {
  try {
    // Check if there is any data in the DB Jet table; if not, add the data from the CSV file.
    const recordCount = await prisma.jet.count();
    if (recordCount === 0) {
      const parsedCsvData = fs.createReadStream(filePath).pipe(csvParser());

      for await (const row of parsedCsvData) {
        const rowObject: Jet = {
          name: row.name,
          wingspan: row.wingspan,
          engines: row.engines,
          year: row.year,
        };

        await prisma.jet.create({ data: rowObject });

        console.log('Jet CSV data has been imported to the DB successfully.');
      }
      // If the database has already been seeded, we will not add anything else to it and exit the function.
    } else {
      console.log(
        'The database has already been seeded so nothing was added to it.'
      );
      return;
    }
  } catch (error) {
    console.error(`Error importing CSV file: ${error}`);
  }
};

// Call to importCsvToDB() when this file is run at application start-up.
importCsvToDb('./data/jet_facts.csv');

export default importCsvToDb;
