import { program } from 'commander';
import fs from 'fs';
import jsonexport from 'jsonexport';
import { DateTime } from 'luxon';
import path from 'path';

import { fetchData } from './fetch';

async function run({ sessionId, date, customerId }: { sessionId: string; date: string; customerId: number }) {
  const { gasData, electricityData } = await fetchData({ sessionId, date, customerId });
  const csvData = await jsonexport([...gasData, ...electricityData]);
  const filename = path.normalize(`./${date}.csv`);
  fs.writeFileSync(filename, csvData);
  console.log(`CSV generated succesfully and saved as ${filename}`)
}

function validateDate(value: string) {
  if (/^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/.test(value)) return value;
  throw new Error('Invalid Date')
}

async function main() {
  program
    .requiredOption('-s, --sessionId <sessionId>', 'A valid session ID is required')
    .requiredOption('-c, --customerId <customerId>', 'The Shell Customer ID')
    .option('-d, --date <date>', 'The date for which to get data', validateDate, DateTime.local().minus({ day: 1 }).toISODate())
    .action(run);

  await program.parseAsync(process.argv);
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`)
    process.exit(1);
  });