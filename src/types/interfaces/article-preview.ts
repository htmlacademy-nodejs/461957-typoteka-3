import {IAnnounce, IArticleId, ICategories, ICommentsCount, ICreatedDate, ITitle} from "../article";

import {IImageSrc} from "./image-src";

interface IArticlePreview extends IArticleId, ICommentsCount, ICreatedDate, ITitle, IAnnounce, ICategories, IImageSrc {}

export {
  IArticlePreview,
};
