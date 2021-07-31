import {IAnnounce, IArticleId, ICategories, ICommentsCount, ICreatedDate, ILink, ITitle} from "../article";

import {IImageSrc} from "./image-src";

interface IArticlePreview
  extends IArticleId,
    ICommentsCount,
    ICreatedDate,
    ITitle,
    IAnnounce,
    ICategories,
    IImageSrc,
    ILink {}

export {IArticlePreview};
