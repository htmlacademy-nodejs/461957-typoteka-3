const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/add`, (req, res) => res.send(`/articles/add`));

articlesRouter.get(`/category/:id`, (req, res, next) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!isNaN(id)) {
    res.send(`/articles/category/${id}`);
  }
  next();
});

articlesRouter.get(`/edit/:id`, (req, res, next) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!isNaN(id)) {
    res.send(`/articles/edit/${id}`);
  }
  next();
});

articlesRouter.get(`/:id`, (req, res, next) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!isNaN(id)) {
    res.send(`/articles/${id}`);
  }
  next();
});

export = articlesRouter;

