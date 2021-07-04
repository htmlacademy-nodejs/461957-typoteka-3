import {IArticleId, ITitle, ICommentsCount} from "../article";

interface IArticleTitleAndCommentsCount extends IArticleId, ITitle, ICommentsCount {}

export {IArticleTitleAndCommentsCount};
