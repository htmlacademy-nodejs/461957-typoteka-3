import {Router} from "express";

// eslint-disable-next-line new-cap
export const articlesRouter = Router();

articlesRouter.get(`/`, (req, res) => {
  res.send(`/api/articles`);
});
