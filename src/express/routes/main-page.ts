const {Router} = require(`express`);

const mainPageRouter = new Router();

mainPageRouter.get(`/`, (req, res) => res.render(`main-page`));

export = mainPageRouter;
