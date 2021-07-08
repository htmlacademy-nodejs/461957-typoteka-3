import {IArticleId, IAnnounce, ICommentsCount} from "../article";

interface IArticleAnnounceAndCommentsCount extends IArticleId, IAnnounce, ICommentsCount {}

export {IArticleAnnounceAndCommentsCount};
