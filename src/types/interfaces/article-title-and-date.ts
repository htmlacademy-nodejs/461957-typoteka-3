import {IArticleId, ICreatedDate, ITitle} from "../article";

interface IArticleTitleAndDate extends IArticleId, ICreatedDate, ITitle {}

export {
  IArticleTitleAndDate,
};
