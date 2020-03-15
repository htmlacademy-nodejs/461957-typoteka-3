const {Router} = require(`express`);

const loginRouter = new Router();

loginRouter.get(`/`, (req, res) => res.send(`login`));

export = loginRouter;
