import {Router} from "express";
import {TemplateNames} from "../../constants-es6";

export const mainPageRouter = Router();

const mainPageContent = {};

mainPageRouter.get(`/`, (req, res) => res.render(TemplateNames.MAIN_PAGE, mainPageContent));
