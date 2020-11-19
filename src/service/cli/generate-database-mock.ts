import yargs from "yargs/yargs";

function run(): void {
  const argv = yargs(process.argv.slice(2)).options({
    database: {type: `string`, demandOption: true, desc: `Database name`},
    user: {type: `string`, demandOption: true, desc: `User who has access to database`},
    number: {type: `number`, desc: `Number of generated articles`, default: 3},
  }).argv;
  console.log(`argv`, argv);
}

run();
