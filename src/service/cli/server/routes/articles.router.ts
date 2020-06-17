import {Router} from "express";
import {articlesController} from "../controllers";

// eslint-disable-next-line new-cap
export const articlesRouter = Router();

articlesRouter.get(`/`, (req, res) => articlesController.getArticles(req, res));
