import {Router} from "express";

export const articlesRouter = Router();

articlesRouter.get(`/`, (req, res) => {
  res.send(`/api/articles`);
});
