import {Router} from "express";

// eslint-disable-next-line new-cap
export const categoriesRouter = Router();

categoriesRouter.get(`/`, (req, res) => {
  res.send(`/api/categories`);
});
