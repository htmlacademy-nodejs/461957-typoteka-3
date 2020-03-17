const {Router} = require(`express`);

const registerRouter = new Router();

registerRouter.get(`/`, (req, res) => res.send(`/register`));

export = registerRouter;
