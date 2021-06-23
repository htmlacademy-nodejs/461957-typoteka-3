// eslint-disable-next-line @typescript-eslint/no-var-requires
const concurrently = require(`concurrently`);

concurrently(
  [
    {command: `npm run start:api:prod`, name: `API`, prefixColor: `blue`},
    {command: `npm run start:ssr:prod`, name: `SSR`, prefixColor: `magenta`},
  ],
  {
    prefix: "name",
    killOthers: ["failure", "success"],
    restartTries: 1,
  },
);
