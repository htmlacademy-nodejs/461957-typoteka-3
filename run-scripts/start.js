const concurrently = require(`concurrently`);

concurrently(
  [
    {command: `npm run start:api`, name: `API`, prefixColor: `blue`},
    {command: `npm run start:ssr`, name: `SSR`, prefixColor: `magenta`},
  ],
  {
    prefix: "name",
    killOthers: ["failure", "success"],
    restartTries: 3,
  },
);
