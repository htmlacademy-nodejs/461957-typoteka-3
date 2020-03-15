const {Router} = require(`express`);

const searchRouter = new Router();

searchRouter.get(`/`, (req, res) => res.send(`search`));

export = searchRouter;
