import {IAnnounce, IArticleId, ICategories, ICommentsCount, ICreatedDate, ITitle} from "../article";

interface IArticlePreview extends IArticleId, ICommentsCount, ICreatedDate, ITitle, IAnnounce, ICategories {}

export {
  IArticlePreview,
};
